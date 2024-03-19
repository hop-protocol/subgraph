set -e

NETWORK="{{network}}"
GITHUB_ORG="${GITHUB_ORG:=hop-protocol}"

npx mustache config/$NETWORK.json subgraph.template.yaml > subgraph.yaml

{{#tokens}}
{{^isUSDCe}}
TOKEN="{{token}}"
TEMP_CONFIG="/tmp/config_${NETWORK}_${TOKEN}.json"
cat config/$NETWORK.json | jq "{ network: .network, isMainnet: .isMainnet, subgraphName: .subgraphName, token: \"$TOKEN\", address: (.tokens[] | select(.token == \"$TOKEN\")).address, tokenName: (.tokens[] | select(.token == \"$TOKEN\")).tokenName, tokenDecimals: (.tokens[] | select(.token == \"$TOKEN\")).tokenDecimals, ammAddress: (try ((.amms[] | select(.token == \"$TOKEN\")).address) // \"\"), bridgeAddress: (try ((.bridges[] | select(.token == \"$TOKEN\")).address) // \"\"), cctpBridgeAddress: (try ((.bridges[] | select(.token == \"$TOKEN\")).cctpAddress) // \"\"), cctpMessageTransmitter: (try ((.bridges[] | select(.token == \"$TOKEN\")).cctpMessageTransmitter) // \"\") }" > $TEMP_CONFIG

npx mustache $TEMP_CONFIG config/mapping_config.template.json > config/${NETWORK}_${TOKEN}.json
{{#isMainnet}}
npx mustache $TEMP_CONFIG src/L1_token_mapping.template.ts > src/L1_token_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L1_mapping.template.ts > src/L1_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L2_HopCCTPImplementation_mapping.template.ts > src/L1_HopCCTPImplementation_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/CCTPMessageTransmitter_mapping.template.ts > src/CCTPMessageTransmitter_mapping_${NETWORK}_${TOKEN}.ts
{{/isMainnet}}
{{^isMainnet}}
npx mustache $TEMP_CONFIG src/L2_token_mapping.template.ts > src/L2_token_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L2_mapping.template.ts > src/L2_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L2_Amm_mapping.template.ts > src/L2_Amm_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L2_HopCCTPImplementation_mapping.template.ts > src/L2_HopCCTPImplementation_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/CCTPMessageTransmitter_mapping.template.ts > src/CCTPMessageTransmitter_mapping_${NETWORK}_${TOKEN}.ts
{{/isMainnet}}
{{/isUSDCe}}

{{#isMainnet}}

# make "USDC.e" be "USDC" in subgraphs
{{#isUSDCe}}
TOKEN="{{token}}"
TEMP_CONFIG="/tmp/config_${NETWORK}_${TOKEN}.json"
cat config/$NETWORK.json | jq "{ network: .network, isMainnet: .isMainnet, subgraphName: .subgraphName, token: \"$TOKEN\", address: (.tokens[] | select(.token == \"$TOKEN\")).address, tokenName: (.tokens[] | select(.token == \"$TOKEN\")).tokenName, tokenDecimals: (.tokens[] | select(.token == \"$TOKEN\")).tokenDecimals, ammAddress: (try ((.amms[] | select(.token == \"$TOKEN\")).address) // \"\"), bridgeAddress: (try ((.bridges[] | select(.token == \"$TOKEN\")).address) // \"\"), cctpBridgeAddress: (try ((.bridges[] | select(.token == \"$TOKEN\")).cctpAddress) // \"\"), cctpMessageTransmitter: (try ((.bridges[] | select(.token == \"$TOKEN\")).cctpMessageTransmitter) // \"\") }" > $TEMP_CONFIG
npx mustache $TEMP_CONFIG src/L1_token_mapping.template.ts > src/L1_token_mapping_${NETWORK}_USDC.ts
{{/isUSDCe}}
{{/isMainnet}}

{{/tokens}}

npm run codegen
npm run build

if (test "$IS_DOCKER" = "true"); then
  # running local (run this in separate terminal and update env vars accordingly):
  # NETWORK=base-goerli RPC=https://goerli.base.org docker-compose up
  # export IPFS_HOST=http://localhost:5001
  # export GRAPH_NODE_HOST=http://localhost:8020
  npx graph create hop-protocol/hop-$NETWORK --node $GRAPH_NODE_HOST

  npx graph deploy --ipfs $IPFS_HOST --node $GRAPH_NODE_HOST --version-label=v0.0.1 hop-protocol/hop-$NETWORK
else
  if (test "$IS_SUBGRAPH_STUDIO" = "true"); then
    echo 'running subgraph studio build'

    SUBGRAPH_STUDIO_DEPLOYMENT_NAME={{network}}
    if (test "$SUBGRAPH_STUDIO_DEPLOYMENT_NAME" = "arbitrum-one"); then
      SUBGRAPH_STUDIO_DEPLOYMENT_NAME="arbitrum"
    fi

    # auth studio:
    npx graph auth --studio $DEPLOY_KEY

    # deploy studio:
    npx graph deploy --studio "hop-protocol-$SUBGRAPH_STUDIO_DEPLOYMENT_NAME"
  else
    echo 'running hosted build'
    # auth:
    npx graph auth https://api.thegraph.com/deploy/ $ACCESS_TOKEN

    # deploy:
    npx graph deploy --product hosted-service --ipfs https://api.thegraph.com/ipfs/ --node https://api.thegraph.com/deploy/ "$GITHUB_ORG/{{subgraphName}}"
  fi
fi

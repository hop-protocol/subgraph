set -e

NETWORK="{{network}}"
GITHUB_ORG="${GITHUB_ORG:=hop-protocol}"

npx mustache config/$NETWORK.json subgraph.template.yaml > subgraph.yaml

{{#tokens}}
TOKEN="{{token}}"
TEMP_CONFIG="/tmp/config_${NETWORK}_${TOKEN}.json"
cat config/$NETWORK.json | jq "{ network: .network, isMainnet: .isMainnet, subgraphName: .subgraphName, token: \"$TOKEN\", address: (.tokens[] | select(.token == \"$TOKEN\")).address, ammAddress: (try ((.amms[] | select(.token == \"$TOKEN\")).address) // \"\"), bridgeAddress: (.bridges[] | select(.token == \"$TOKEN\")).address }" > $TEMP_CONFIG

npx mustache $TEMP_CONFIG config/mapping_config.template.json > config/${NETWORK}_${TOKEN}.json
{{#isMainnet}}
npx mustache $TEMP_CONFIG src/L1_token_mapping.template.ts > src/L1_token_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L1_mapping.template.ts > src/L1_mapping_${NETWORK}_${TOKEN}.ts
{{/isMainnet}}
{{^isMainnet}}
npx mustache $TEMP_CONFIG src/L2_token_mapping.template.ts > src/L2_token_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L2_mapping.template.ts > src/L2_mapping_${NETWORK}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L2_Amm_mapping.template.ts > src/L2_Amm_mapping_${NETWORK}_${TOKEN}.ts
{{/isMainnet}}
{{/tokens}}

npm run codegen
npm run build

# auth:
# npx graph auth https://api.thegraph.com/deploy/ $ACCESS_TOKEN

npx graph deploy --debug --product hosted-service --ipfs https://api.thegraph.com/ipfs/ --node https://api.thegraph.com/deploy/ "$GITHUB_ORG/{{subgraphName}}"

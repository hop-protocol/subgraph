CHAIN="{{network}}"

npx mustache config/$CHAIN.json subgraph.template.yaml > subgraph.yaml

{{#tokens}}
TOKEN="{{token}}"
TEMP_CONFIG="/tmp/config_${CHAIN}_${TOKEN}.json"
cat config/$CHAIN.json | jq "{ network: .network, isMainnet: .isMainnet, token: \"$TOKEN\", address: (.tokens[] | select(.token == \"$TOKEN\")).address }" > $TEMP_CONFIG

npx mustache $TEMP_CONFIG config/template.json > config/${CHAIN}_${TOKEN}.json
npx mustache $TEMP_CONFIG src/token_mapping.template.ts > src/token_mapping_${CHAIN}_${TOKEN}.ts
{{#isMainnet}}
npx mustache $TEMP_CONFIG src/L1_mapping.template.ts > src/L1_mapping_${CHAIN}_${TOKEN}.ts
{{/isMainnet}}
{{^isMainnet}}
npx mustache $TEMP_CONFIG src/L2_mapping.template.ts > src/L2_mapping_${CHAIN}_${TOKEN}.ts
npx mustache $TEMP_CONFIG src/L2_Amm_mapping.template.ts > src/L2_Amm_mapping_${CHAIN}_${TOKEN}.ts
{{/isMainnet}}
{{/tokens}}

npm run codegen
npm run build
graph deploy hop-protocol/hop-$CHAIN --ipfs https://api.thegraph.com/ipfs/ --node https://api.thegraph.com/deploy/

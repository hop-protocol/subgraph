# Hop Subgraph

> The Hop Protocol Subgraph for [The Graph](https://thegraph.com/).

## Subgraphs

Mainnet

- [Mainnet](https://thegraph.com/explorer/subgraph/hop-protocol/hop-mainnet)
- [Polygon](https://thegraph.com/explorer/subgraph/hop-protocol/hop-polygon)
- [xDai](https://thegraph.com/explorer/subgraph/hop-protocol/hop-xdai)
- [Optimism](https://thegraph.com/explorer/subgraph/hop-protocol/hop-optimism)
- [Arbitrum](https://thegraph.com/explorer/subgraph/hop-protocol/hop-arbitrum)

Goerli

- [Goerli](https://thegraph.com/explorer/subgraph/hop-protocol/hop-goerli)
- [Mumbai](https://thegraph.com/explorer/subgraph/hop-protocol/hop-mumbai)
- [Optimism Goerli](https://thegraph.com/explorer/subgraph/hop-protocol/hop-optimism-goerli)

## Development

**Authenticate:**

```bash
npx graph auth https://api.thegraph.com/deploy/ <access-token>
```

The access token is found on the hosted-service [dashboard](https://thegraph.com/hosted-service/dashboard).

**Build and deploy:**

```bash
npm run build-deploy:mainnet
npm run build-deploy:polygon
npm run build-deploy:xdai
npm run build-deploy:optimism
npm run build-deploy:arbitrum

# testnet
npm run build-deploy:goerli
npm run build-deploy:mumbai
npm run build-deploy:optimism-goerli
```

By default, it will deploy under `hop-protocol` github org.

Set `GITHUB_ORG` to deploy another a different account.

Example:

```bash
GITHUB_ORG=<github-username> npm run build-deploy:mainnet
```

The following subgraphs will need to be created on the dashboard:

- `hop-mainnet`
- `hop-polygon`
- `hop-xdai`
- `hop-optimism`
- `hop-arbitrum`
- `hop-goerli`
- `hop-mumbai`
- `hop-optimism-goerli`

**Clean build files:**

```bash
npm run clean
```

**Deploying locally:**

Update networks in docker-compose.yml

```yml
ethereum: 'optimism:https://mainnet.optimism.io'
```

Start containers:

```bash
docker-compose up
```

Create local subgraph:

```bash
npx graph create hop-protocol/hop-optimism --node http://127.0.0.1:8020
```

Deploy subgraph after building:

```bash
npx graph deploy --debug --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-optimism
```

## License

[MIT](LICENSE)

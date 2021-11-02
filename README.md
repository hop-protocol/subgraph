# Hop Subgraph

> The Hop Protocol Subgraph for [The Graph](https://thegraph.com/).

## Subgraphs

- [Mainnet](https://thegraph.com/explorer/subgraph/hop-protocol/hop-mainnet)
- [Polygon](https://thegraph.com/explorer/subgraph/hop-protocol/hop-polygon)
- [xDai](https://thegraph.com/explorer/subgraph/hop-protocol/hop-xdai)
- [Optimism](https://thegraph.com/explorer/subgraph/hop-protocol/hop-arbitrum)
- [Arbitrum](https://thegraph.com/explorer/subgraph/hop-protocol/hop-arbitrum)

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
- `hop-arbitrum`
- `hop-arbitrum`

**Clean build files:**

```bash
npm run clean
```

## License

[MIT](LICENSE)

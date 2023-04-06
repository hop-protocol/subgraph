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

### Authenticate

```bash
npx graph auth https://api.thegraph.com/deploy/ <access-token>
```

The access token is found on the hosted-service [dashboard](https://thegraph.com/hosted-service/dashboard).

### Build and deploy

```bash
npm run build-deploy:mainnet
npm run build-deploy:mainnet-subgraph-studio
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

### Clean build files:

```bash
npm run clean
```

## Deploying locally:

Update networks in `docker-compose.yml`:

For Optimism Regenesis:

```yml
ethereum: 'optimism:https://mainnet-replica-4.optimism.io'
```

For Arbitrum Nova:

```yml
ethereum: 'nova:https://nova.arbitrum.io/rpc'
```

For zkSync:

```yml
ethereum: 'zksync:https://zksync2-testnet.zksync.dev'
```

For ConsenSys zkEVM:

```yml
ethereum: 'consensyszk:https://consensys-zkevm-goerli-prealpha.infura.io/v3/YOUR_PROJECT_ID'
```

For Base (Goerli):

```yml
ethereum: 'base-goerli:https://goerli.base.org'
```

Start containers:

```bash
docker-compose up
```

Create local subgraph (in another terminal):

For Optimism Regenesis:

```bash
npx graph create hop-protocol/hop-optimism --node http://127.0.0.1:8020
```

For Arbitrum Nova:

```bash
npx graph create hop-protocol/hop-nova --node http://127.0.0.1:8020
```

For zkSync:

```bash
npx graph create hop-protocol/hop-zksync --node http://127.0.0.1:8020
```

For ConsenSys zkEVM:

```bash
npx graph create hop-protocol/hop-consensyszk --node http://127.0.0.1:8020
```

For Base (Goerli):

```bash
npx graph create hop-protocol/hop-base-goerli --node http://127.0.0.1:8020
```

Deploy subgraph after building (add this line at the bottom of `buildfiles.template.sh` and comment out existing `npx graph deploy` line):

For Optimism Regenesis:

```bash
npx graph deploy --debug --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-optimism
```

For Arbitrum Nova:

```bash
npx graph deploy --debug --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-nova
```

For zkSync:

```bash
npx graph deploy --debug --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-zksync
```

For ConsenSys zkEVM:

```bash
npx graph deploy --debug --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-consensyszk
```

For Base (Goerli):

```bash
npx graph deploy --debug --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-base-goerli
```

Build and deploy:

For Optimism Regenesis:

```bash
npm run build-deploy:optimism
```

For Arbitrum Nova:

```bash
npm run build-deploy:nova
```

For zkSync:

```bash
npm run build-deploy:zksync
```

For ConsenSys zkEVM:

```bash
npm run build-deploy:consensyszk
```

For Base (Goerli):

```bash
npm run build-deploy:base-goerli
```

Query subgraphs

For Optimism Regenesis:

http://localhost:8000/subgraphs/name/hop-protocol/hop-optimism

For Arbitrum Nova:

http://localhost:8000/subgraphs/name/hop-protocol/hop-nova

For zkSync:

http://localhost:8000/subgraphs/name/hop-protocol/hop-zksync

For ConsenSys zkEVM:

http://localhost:8000/subgraphs/name/hop-protocol/hop-consensyszk

For Base:

http://localhost:8000/subgraphs/name/hop-protocol/hop-base-goerli

## License

[MIT](LICENSE)

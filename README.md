# Hop Subgraph

> The Hop Protocol Subgraph for [The Graph](https://thegraph.com/).


## Subgraphs

Mainnet

- [Mainnet](https://thegraph.com/explorer/subgraph/hop-protocol/hop-mainnet)
- [Polygon](https://thegraph.com/explorer/subgraph/hop-protocol/hop-polygon)
- [xDai](https://thegraph.com/explorer/subgraph/hop-protocol/hop-xdai)
- [Optimism](https://thegraph.com/explorer/subgraph/hop-protocol/hop-optimism)
- [Arbitrum](https://thegraph.com/explorer/subgraph/hop-protocol/hop-arbitrum)
- [Base](https://thegraph.com/explorer/subgraph/hop-protocol/hop-base)

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

## Instructions to Add new chain config or new addresses

1. Update `scripts/mapping_config.json` with the new chain network and subgraph name mapping.

2. Update the `@hop-protocol/sdk` package version in `package.json`.

3. Add the `build-deploy` npm script in `package.json`.

4. Update `.gitignore` and `clean.sh` (this step can probably be automated).

5. Run `npm i` to install the latest `@hop-protocol/sdk` package

6. Run `npm run generate-config-json` to create the updated config files

The config generation script is run automatically when building the subgraph with npm `build-deploy` command and can also be ran with `npm run generate-config-json`.

The generation script `scripts/generate_config_json.js` will read the chain/token config from `@hop-protocol/sdk` and output/override the config JSON files to `config/`.

7. [Install Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

8. After bumping the version of `@hop-protocol/sdk` in `package.json` and pushing to github and github action finishes building the [docker image](https://hub.docker.com/r/hopprotocol/subgraph), run the following commands to build and deploy the subgraph locally or on a server using docker compose:

```bash
# change this values to deploy a different subgraph. Refer to `scripts/mapping_config.json` for the subgraph name
export NETWORK=base-goerli
export RPC=https://goerli.base.org

# download docker-compose file
wget https://raw.githubusercontent.com/hop-protocol/subgraph/master/docker-compose.yml

# start services
# the `-d` is used to run in background
# the `--pull=always` is used to update the image when there is one available

# NOTE: The NETWORK and RPC are redundant, but sometimes cause issues if they do not exist
sudo RPC=https://rpc.linea.build NETWORK=linea docker compose up --pull=always
```

After a minute or so the graph should be available at http://localhost:8000/subgraphs/name/hop-protocol/hop-base-goerli/graphql

9. Troubleshooting

* If your server is unreachable from outside, ensure you enabled port `8000` with UFW
  * Disable and enable UFW after this

## Pre-setup notes

_**These are deprecated in favor of the local Docker instructions. Only reference these if Docker is not used.**_

```bash
# Required for AbortController
nvm install 16.6.1
nvm use 16.6.1

# Various requirements
sudo apt install npm
sudo apt install -y jq
npm i @graphprotocol/graph-cli@0.53.0
``````

#### Troubleshooting

- Depending on your NPM version, oboe@2.1.4  & multiaddr@6.1.1 appears to hang when installing NPM packages. In reality, they just take a long time to install (up to or over an hour, depending on the instance type & resources).

- Auth key starts with 70cc

- When setting it up locally and running a load balancer, each of these should work for debugging at various stages
  - http://ec2...com:8000/subgraphs/name/hop-protocol/hop-base-mainnet
  - http://lb...com/subgraphs/name/hop-protocol/hop-base-mainnet
  - https://base.subgraph.hop.exchange/subgraphs/name/hop-protocol/hop-base


- If you get the following error, you need to run comment out two lines in `buildfile.template.sh`

```
# Error
Failed to deploy to Graph node https://api.thegraph.com/deploy/: subgraph failure::Subgraph [hop-protocol/hop-base-mainnet] not found

# Lines to comment
npx graph auth https://api.thegraph.com/deploy/ $ACCESS_TOKEN
npx graph deploy --product hosted-service --ipfs https://api.thegraph.com/ipfs/ --node https://api.thegraph.com/deploy/ "$GITHUB_ORG/{{subgraphName}}"
```
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

# local
npm run build-deploy:arbitrum-goerli
npm run build-deploy:nova
npm run build-deploy:zksync
npm run build-deploy:base-goerli
npm run build-deploy:base-mainnet
npm run build-deploy:linea
npm run build-deploy:polygonzk
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

For Base:

```yml
ethereum: 'base-mainnet:https://developer-access-mainnet.base.org'
```

For Linea:

```yml
ethereum: 'linea:https://rpc.linea.build'
```

For Polygonzk:

```yml
ethereum: 'polygonzk:https://zkevm-rpc.com'
```

For Linea (Goerli):

```yml
ethereum: 'linea-goerli:https://consensys-zkevm-goerli-prealpha.infura.io/v3/YOUR_PROJECT_ID'
```

For Base (Goerli):

```yml
ethereum: 'base-goerli:https://goerli.base.org'
```

For Arbitrum (Goerli):

```yml
ethereum: 'arbitrum-goerli:https://goerli-rollup.arbitrum.io/rpc'
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

For Base:

```bash
npx graph create hop-protocol/hop-base-mainnet --node http://127.0.0.1:8020
```

For Base:

```bash
npx graph create hop-protocol/hop-linea --node http://127.0.0.1:8020
```

For Polygonzk:

```bash
npx graph create hop-protocol/hop-polygonzk --node http://127.0.0.1:8020
```

For Linea (Goerli):

```bash
npx graph create hop-protocol/hop-linea-goerli --node http://127.0.0.1:8020
```

For Base (Goerli):

```bash
npx graph create hop-protocol/hop-base-goerli --node http://127.0.0.1:8020
```

For Arbitrum (Goerli):

```bash
npx graph create hop-protocol/hop-arbitrum-goerli --node http://127.0.0.1:8020
```

Deploy subgraph after building (add this line at the bottom of `buildfiles.template.sh` and comment out existing `npx graph deploy` line):

For Optimism Regenesis:

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-optimism
```

For Arbitrum Nova:

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-nova
```

For zkSync:

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-zksync
```

For Base:

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-base-mainnet
```

For Linea:

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-linea
```

For Polygonzk:

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-polygonzk
```

For Linea (Goerli):

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-linea-goerli
```

For Base (Goerli):

```bash
npx graph deploy --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-base-goerli
```

For Arbitrum (Goerli):

```bash
npx graph deploy --debug --ipfs http://localhost:5001 --node http://localhost:8020 hop-protocol/hop-arbitrum-goerli
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

For Base:

```bash
npm run build-deploy:base-mainnet
```

For Linea:

```bash
npm run build-deploy:linea
```

For Polygonzk:

```bash
npm run build-deploy:polygonzk
```

For Linea (Goerli):

```bash
npm run build-deploy:linea-goerli
```

For Base (Goerli):

```bash
npm run build-deploy:base-goerli
```

For Arbitrum (Goerli):

```bash
npm run build-deploy:arbitrum-goerli
```

Query subgraphs

For Optimism Regenesis:

http://localhost:8000/subgraphs/name/hop-protocol/hop-optimism

For Arbitrum Nova:

http://localhost:8000/subgraphs/name/hop-protocol/hop-nova

For zkSync:

http://localhost:8000/subgraphs/name/hop-protocol/hop-zksync

For Base:

http://localhost:8000/subgraphs/name/hop-protocol/hop-base-mainnet

For Linea:

http://localhost:8000/subgraphs/name/hop-protocol/hop-linea

For Polygonzk:

http://localhost:8000/subgraphs/name/hop-protocol/hop-polygonzk

For Linea (Goerli):

http://localhost:8000/subgraphs/name/hop-protocol/hop-linea-goerli

For Base (Goerli):

http://localhost:8000/subgraphs/name/hop-protocol/hop-base-goerli

For Arbitrum (Goerli):

http://localhost:8000/subgraphs/name/hop-protocol/hop-arbitrum-goerli

## Github Actions

Run github action build locally with [act](https://github.com/nektos/act):

```sh
act --workflows .github/workflows/build.yml
```

## License

[MIT](LICENSE)

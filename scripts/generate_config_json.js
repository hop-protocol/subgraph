const fs = require('fs')
const path = require('path')
const { mainnet: mainnetAddresses, goerli: goerliAddresses } = require('@hop-protocol/core/addresses')
const { tokens: tokenMeta } = require('@hop-protocol/core/metadata')
const { subgraphNameMapping, subgraphNetworkMapping } = require('./mapping_config.json')

const networkConfig = {
  mainnet: mainnetAddresses,
  goerli: goerliAddresses
}

function createConfig (net, chain) {
  let config
  if (chain === 'ethereum') {
    config = createL1Config(net, chain)
  } else {
    config = createL2Config(net, chain)
  }

  return addCctpBridges(config)
}

function createL1Config (net, chain) {
  const network = subgraphNetworkMapping[net][chain]
  const subgraphName = subgraphNameMapping[net][chain]
  const isMainnet = true
  const tokens = createTokensConfig(net, chain)
  const bridges = createBridgesConfig(net, chain)

  return {
    network,
    isMainnet,
    subgraphName,
    tokens,
    bridges
  }
}

function createL2Config (net, chain) {
  const isMainnet = false
  const network = subgraphNetworkMapping[net][chain]
  const subgraphName = subgraphNameMapping[net][chain]
  const tokens = createTokensConfig(net, chain)
  const amms = createAmmsConfig(net, chain)
  const bridges = createBridgesConfig(net, chain)

  return {
    network,
    isMainnet,
    subgraphName,
    tokens,
    amms,
    bridges
  }
}

function createTokensConfig (net, chain) {
  const conf = networkConfig[net]
  if (!conf) {
    return []
  }
  if (!conf.bridges) {
    return []
  }
  const bridges = conf.bridges
  const json = []
  for (const tokenSymbol in bridges) {
    const bridge = bridges[tokenSymbol]
    for (const _chain in bridge) {
      if (_chain === chain) {
        const tokenConfig = createTokenConfig(net, chain, tokenSymbol)
        json.push(tokenConfig)
      }
    }
  }

  return json
}

function createBridgesConfig (net, chain) {
  const conf = networkConfig[net]
  if (!conf) {
    return []
  }
  if (!conf.bridges) {
    return []
  }
  const bridges = conf.bridges
  const json = []
  for (const tokenSymbol in bridges) {
    const bridge = bridges[tokenSymbol]
    for (const _chain in bridge) {
      if (_chain === chain) {
        const tokenConfig = createBridgeConfig(net, chain, tokenSymbol)
        json.push(tokenConfig)
      }
    }
  }

  const usdcIndex = json.findIndex(bridge => bridge.token === 'USDC')
  const usdcEIndex = json.findIndex(bridge => bridge.token === 'USDC.e')

  if (usdcIndex !== -1 && usdcEIndex !== -1) {
    json[usdcIndex].address = json[usdcEIndex].address
    json[usdcIndex].cctpAddress = json[usdcEIndex].cctpAddress
    json[usdcIndex].cctpMessageTransmitter = json[usdcEIndex].cctpMessageTransmitter
    json[usdcIndex].startBlock = json[usdcEIndex].startBlock

    json.splice(usdcEIndex, 1) // Remove the USDC.e object
  }

  return json
}

function createAmmsConfig (net, chain) {
  const conf = networkConfig[net]
  if (!conf) {
    return []
  }
  if (!conf.bridges) {
    return []
  }
  const bridges = conf.bridges
  const json = []
  for (const tokenSymbol in bridges) {
    if (tokenSymbol === 'HOP' || tokenSymbol === 'USDC') {
      continue
    }
    const bridge = bridges[tokenSymbol]
    for (const _chain in bridge) {
      if (_chain === chain) {
        const tokenConfig = createAmmConfig(net, chain, tokenSymbol)
        json.push(tokenConfig)
      }
    }
  }

  return json
}

function createTokenConfig (net, chain, tokenSymbol) {
  let dataSourceName = 'Token'
  if (tokenSymbol !== 'ETH') {
    dataSourceName = `${dataSourceName}${tokenSymbol}`
  }
  const token = tokenSymbol
  const tokenName = tokenMeta[tokenSymbol].name
  const tokenDecimals = tokenMeta[tokenSymbol].decimals
  let address = ''
  if (chain === 'ethereum') {
    address = networkConfig[net].bridges[tokenSymbol][chain].l1CanonicalToken
  } else {
    address = networkConfig[net].bridges[tokenSymbol][chain].l2CanonicalToken
  }
  const startBlock = networkConfig[net].bridges[tokenSymbol][chain].bridgeDeployedBlockNumber || 0

  if (!dataSourceName) {
    throw new Error(`dataSourceName not found for ${tokenSymbol}`)
  }

  if (!token) {
    throw new Error(`token not found for ${tokenSymbol}`)
  }

  if (!tokenName) {
    throw new Error(`tokenName not found for ${tokenSymbol}`)
  }

  if (!tokenDecimals) {
    throw new Error(`tokenDecimals not found for ${tokenSymbol}`)
  }

  if (!address) {
    throw new Error(`address not found for ${tokenSymbol} on chain ${chain}`)
  }

  return {
    dataSourceName,
    isUSDCe: tokenSymbol === 'USDC.e',
    token,
    tokenName,
    tokenDecimals,
    address,
    startBlock
  }
}

function createBridgeConfig (net, chain, tokenSymbol) {
  let dataSourceName = 'HopBridge'
  if (chain === 'ethereum') {
    dataSourceName = 'HopL1Bridge'
  } else {
    dataSourceName = 'HopL2Bridge'
  }

  if (tokenSymbol !== 'ETH') {
    dataSourceName = `${dataSourceName}${tokenSymbol}`
  }

  const token = tokenSymbol
  let address = ''
  let cctpAddress = ''
  let cctpMessageTransmitter = ''
  if (chain === 'ethereum') {
    address = networkConfig[net].bridges[tokenSymbol][chain].l1Bridge
    if (networkConfig[net].bridges[tokenSymbol][chain].cctpL1Bridge) {
      cctpAddress = networkConfig[net].bridges[tokenSymbol][chain].cctpL1Bridge
      cctpMessageTransmitter = networkConfig[net].bridges[tokenSymbol][chain].cctpMessageTransmitter
    }
  } else {
    address = networkConfig[net].bridges[tokenSymbol][chain].l2Bridge
    if (networkConfig[net].bridges[tokenSymbol][chain].cctpL2Bridge) {
      cctpAddress = networkConfig[net].bridges[tokenSymbol][chain].cctpL2Bridge
      cctpMessageTransmitter = networkConfig[net].bridges[tokenSymbol][chain].cctpMessageTransmitter
    }
  }

  const startBlock = networkConfig[net].bridges[tokenSymbol][chain].bridgeDeployedBlockNumber || 0

  if (!dataSourceName) {
    throw new Error(`dataSourceName not found for ${tokenSymbol}`)
  }

  if (!token) {
    throw new Error(`token not found for ${tokenSymbol}`)
  }

  if (!(address || cctpAddress)) {
    console.log(networkConfig[net].bridges[tokenSymbol][chain])
    throw new Error(`address not found for ${tokenSymbol} on chain ${chain}`)
  }

  return {
    dataSourceName,
    token,
    address,
    cctpAddress,
    cctpMessageTransmitter,
    startBlock
  }
}

function createAmmConfig (net, chain, tokenSymbol) {
  let dataSourceName = 'HopL2Amm'

  let _token = tokenSymbol
  if (_token === 'USDC.e') {
    _token = 'USDC'
  }

  if (_token !== 'ETH') {
    dataSourceName = `${dataSourceName}${_token}`
  }

  const address = networkConfig[net].bridges[tokenSymbol][chain].l2SaddleSwap
  const startBlock = networkConfig[net].bridges[tokenSymbol][chain].bridgeDeployedBlockNumber || 0

  if (!dataSourceName) {
    throw new Error(`dataSourceName not found for ${tokenSymbol}`)
  }

  if (!address) {
    throw new Error(`amm address not found for ${tokenSymbol} on ${chain} chain`)
  }

  return {
    dataSourceName,
    token: _token,
    address,
    startBlock
  }
}

function addCctpBridges(json) {
  const cctpBridges = []
  const originalBridges = json.bridges

  // Modify original array to remove "cctpAddress" field and copy items with non-empty "cctpAddress" to the new array
  const bridges = originalBridges.map(bridge => {
    if (bridge.cctpAddress !== "") {
      cctpBridges.push({ ...bridge })
    }
    const { cctpAddress, cctpMessageTransmitter, ...rest } = bridge
    return rest
  });

  json.bridges = bridges
  json.cctpBridges = cctpBridges.map(bridge => {
    bridge.dataSourceName = bridge.dataSourceName.replace('Bridge', 'CctpBridge')
    return bridge
  })

  return json
}

async function main () {
  const outdir = path.resolve(__dirname, '../config')
  const data = {}
  for (const net in subgraphNetworkMapping) {
    for (const chain in subgraphNetworkMapping[net]) {
      const basefilename = subgraphNetworkMapping[net][chain]
      const filename = `${basefilename}.json`
      const content = JSON.stringify(createConfig(net, chain), null, 2)
      data[filename] = content
    }
  }

  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir)
  }

  for (const filename in data) {
    console.log(`writing file ${filename}`)
    fs.writeFileSync(path.resolve(outdir, filename), data[filename])
  }

  console.log('done')
}

main().catch(console.error)

const RibonGov = artifacts.require("RibonGov")
const RibonIntegrationsPool = artifacts.require("RibonIntegrationsPool")

module.exports = async function (deployer, network, accounts) {
  // Deploy RibonGov
  await deployer.deploy(RibonGov)
  const ribonGov = await RibonGov.deployed()

  // Deploy Ribon Integrations Pool
  await deployer.deploy(RibonIntegrationsPool, ribonGov.address)
  const ribonIntegrationsPool = await RibonIntegrationsPool.deployed()
}

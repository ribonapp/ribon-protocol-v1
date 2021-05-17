const RibonGov = artifacts.require("RibonGov")
const Ribon = artifacts.require("Ribon")

module.exports = async function (deployer, network, accounts) {
  // Deploy RibonGov
  await deployer.deploy(RibonGov)
  const ribonGov = await RibonGov.deployed()

  await deployer.deploy(Ribon, ribonGov.address)
  const ribon = await RibonGov.deployed()
}

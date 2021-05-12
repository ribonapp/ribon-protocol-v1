const RibonGov = artifacts.require("RibonGov")
const RibonIntegrationsPool = artifacts.require("RibonIntegrationsPool")

module.exports = async function (callback) {
  ribonGov = await RibonGov.deployed()
  ribonIntegrationsPool = await RibonIntegrationsPool.deployed()
  balance = await ribonGov.balanceOf(ribonIntegrationsPool.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}

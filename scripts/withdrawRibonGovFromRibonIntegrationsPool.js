const RibonGov = artifacts.require("RibonGov")
const RibonIntegrationsPool = artifacts.require("RibonIntegrationsPool")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const ribonGov = await RibonGov.deployed()
  const ribonIntegrationsPool = await RibonIntegrationsPool.deployed()

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await ribonGov.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await ribonGov.balanceOf(ribonIntegrationsPool.address)
  console.log("*** My Token ***")
  console.log(
    "Balance RibonGov Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance RibonGov Before RibonIntegrationsPool " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** RibonIntegrationsPool ***")
  balanceFarmTokenBeforeAccounts0 = await ribonIntegrationsPool.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await ribonIntegrationsPool.balanceOf(ribonIntegrationsPool.address)
  console.log(
    "Balance RibonIntegrationsPool Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance RibonIntegrationsPool Before RibonIntegrationsPool " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await ribonIntegrationsPool.withdraw(web3.utils.toWei("100", "ether"))

  console.log("*** RibonGov ***")
  balanceMyTokenAfterAccounts0 = await ribonGov.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await ribonGov.balanceOf(ribonIntegrationsPool.address)
  console.log(
    "Balance RibonGov After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance RibonGov After RibonIntegrationsPool " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** RibonIntegrationsPool ***")
  balanceFarmTokenAfterAccounts0 = await ribonIntegrationsPool.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await ribonIntegrationsPool.balanceOf(ribonIntegrationsPool.address)
  console.log(
    "Balance RibonIntegrationsPool After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance RibonIntegrationsPool After RibonIntegrationsPool " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}

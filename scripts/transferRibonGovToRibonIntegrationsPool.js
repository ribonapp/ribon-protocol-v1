const RibonGov = artifacts.require("RibonGov")
const RibonIntegrationsPool = artifacts.require("RibonIntegrationsPool")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const ribonGov = await RibonGov.deployed()
  const ribonIntegrationsPool = await RibonIntegrationsPool.deployed()

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await ribonGov.allowance(
    accounts[0],
    ribonIntegrationsPool.address
  )
  console.log(
    "Amount of ribonGov FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await ribonGov.approve(ribonIntegrationsPool.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of ribonGov on our behalf
  const allowanceAfter = await ribonGov.allowance(accounts[0], ribonIntegrationsPool.address)
  console.log(
    "Amount of MyToken ribonIntegrationsPool is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of ribonGov before and after the transfer
  balanceMyTokenBeforeAccounts0 = await ribonGov.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await ribonGov.balanceOf(ribonIntegrationsPool.address)
  console.log("*** My Token ***")
  console.log(
    "Balance ribonGov Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance ribonGov Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await ribonIntegrationsPool.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await ribonIntegrationsPool.balanceOf(ribonIntegrationsPool.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await ribonIntegrationsPool.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await ribonGov.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await ribonGov.balanceOf(ribonIntegrationsPool.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await ribonIntegrationsPool.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await ribonIntegrationsPool.balanceOf(ribonIntegrationsPool.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
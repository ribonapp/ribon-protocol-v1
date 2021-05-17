const RibonGov = artifacts.require("RibonGov");

contract("RibonGov", accounts => {
  it("should put 1000000 RibonGov in the first account", async () => {
    const instance = await RibonGov.deployed()
    const balance = await instance.balanceOf(accounts[0])
    assert.equal(
      web3.utils.fromWei(balance.toString()),
      1000000,
      "1000000 wasn't in the first account"
    );
  });

  it("should have RibonGov name", async () => {
    const instance = await RibonGov.deployed()
    const name = await instance.name();
    assert.equal(
        name,
        "RibonGov",
        "Name wasn't RibonGov"
      )
  });
});
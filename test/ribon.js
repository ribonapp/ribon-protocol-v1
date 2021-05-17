const console = require("console");

const Ribon = artifacts.require("Ribon");
const RibonGov = artifacts.require("RibonGov");

contract("Ribon", accounts => {
  it("should have Ribon name", async () => {
    const instance = await Ribon.deployed()
    const name = await instance.name();
    assert.equal(
        name,
        "Ribon",
        "Name wasn't Ribon"
      )
  });

  describe("#balance", () => {
    it("should return 0", async () => {
      const instance = await Ribon.deployed()
      const balance = await instance.balance();
      assert.equal(
          web3.utils.fromWei(balance.toString()),
          0,
          "Balance wasn't 0"
        )
    });
  });

  describe("#stakeGovernanceToken", async () => {
    it("should stake governance tokens", async () => {
      const accounts = await new web3.eth.getAccounts()
      const ribonGov = await RibonGov.deployed();
      const ribon = await Ribon.deployed()

      await ribonGov.approve(ribon.address, web3.utils.toWei("100", "ether"))

      await ribon.stakeGovernanceTokens(web3.utils.toWei("100", "ether"))
      

      const balance = await ribon.balance();
      assert.equal(
          balance.toString(),
          web3.utils.toWei("100", "ether"),
          "Balance wasn't 100 ether"
        )
    });
  })
});
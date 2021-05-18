const console = require("console");

const Ribon = artifacts.require("Ribon");
const RibonGov = artifacts.require("RibonGov");

contract("Ribon", accounts => {
  let ribonGov;
  let ribon;

  before(async function () {
    ribonGov = await RibonGov.deployed();
    ribon = await Ribon.deployed();
  })

  it("should have Ribon name", async () => {
    const name = await ribon.name();
    assert.equal(
        name,
        "Ribon",
        "Name wasn't Ribon"
      )
  });



  describe("#balance", () => {
    it("should return 0 when has no tokens", async () => {
      const balance = await ribon.balance();
      assert.equal(
          web3.utils.fromWei(balance.toString()),
          0,
          "Balance wasn't 0"
        )
    });
  });

  describe("#stakeGovernanceToken when stake correctly ", async () => {
    let balance;
    const amount = web3.utils.toWei("100", "ether");
    
    before('setup contract for each test', async function () {
      await ribonGov.approve(ribon.address, amount)
      await ribon.stakeGovernanceTokens(amount)
      balance = await ribon.balance();
    });

    it("should add the amount on balance", async () => {
      assert.equal(
        balance.toString(),
        web3.utils.toWei("100", "ether"),
        "Balance wasn't 100 ether"
      );
    });
      
    it("should add the amount on total staked", async () => {
      const totalStaked = await ribon.totalStaked();
      assert.equal(
          totalStaked.toString(),
          amount,
          "Balance wasn't 100 ether"
        )
    });
  });
});
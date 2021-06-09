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

  describe("#deposit when deposit correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribonGov.approve(ribon.address, amount)
      await ribon.deposit(amount)
    });
      
    it("should add the amount on total donation pool balance", async () => {
      const donationPoolBalance = await ribon.getDonationPoolBalance();
      assert.equal(
          donationPoolBalance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });
  });
});
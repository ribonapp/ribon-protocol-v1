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
      
    it("should add the amount on donation pool balance", async () => {
      const donationPoolBalance = await ribon.getDonationPoolBalance();
      assert.equal(
          donationPoolBalance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });
  });

  describe("#allowIntegrationDistribute when allow correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribon.allowIntegrationDistribute(accounts[0], amount)
    });
      
    it("should add the amount on integration balance", async () => {
      const integrationBalance = await ribon.getIntegrationBalance(accounts[0]);
      assert.equal(
          integrationBalance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });

    it("should remove the amount on donation pool balance", async () => {
      const donationPoolBalance = await ribon.getDonationPoolBalance();
      assert.equal(
          donationPoolBalance.toString(),
          0,
          "Balance wasn't 0 ether"
        )
    });
  });

  describe("#allowUserDonate when allow correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribon.allowUserDonate(accounts[0], amount)
    });
      
    it("should add the amount on user balance", async () => {
      const userBalance = await ribon.getUserBalance(accounts[0]);
      assert.equal(
        userBalance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });

    it("should remove the amount on integration balance", async () => {
      const integrationBalance = await ribon.getIntegrationBalance(accounts[0]);
      assert.equal(
          integrationBalance.toString(),
          0,
          "Balance wasn't 0 ether"
        )
    });
  });

  describe("#donate when donate correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribon.donate(accounts[3], amount)
    });
      
    it("should add the amount on non profit balance", async () => {
      const userBalance = await ribonGov.balanceOf(accounts[3]);
      assert.equal(
        userBalance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });

    it("should remove the amount on user balance", async () => {
      const userBalance = await ribon.getUserBalance(accounts[0]);
      assert.equal(
          userBalance.toString(),
          0,
          "Balance wasn't 0 ether"
        )
    });
  });
});
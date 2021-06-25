const console = require("console");

const Ribon = artifacts.require("Ribon");
const DonationToken = artifacts.require("DonationToken");

contract("Ribon", accounts => {
  let donationToken;
  let ribon;

  before(async function () {
    donationToken = await DonationToken.deployed();
    ribon = await Ribon.deployed();
  })

  describe("#deposit when deposit correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await donationToken.approve(ribon.address, amount)
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

  describe("#donationThroughIntegration when donate correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    const nonProfit = accounts[3];
    const integration = accounts[0];
    const user = accounts[4];
    
    before(async function () {
      await ribon.donationThroughIntegration(nonProfit, user, amount)
    });
      
    it("should add the amount on non profit balance", async () => {
      const userBalance = await donationToken.balanceOf(nonProfit);
      assert.equal(
        userBalance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });

    it("should remove the amount on user balance", async () => {
      const userBalance = await ribon.getUserBalance(integration);
      assert.equal(
          userBalance.toString(),
          0,
          "Balance wasn't 0 ether"
        )
    });

    it("should add the amount on user impact", async () => {
      const userBalance = await ribon.getUserImpactByNonProfit(user, nonProfit);
      assert.equal(
          userBalance.toString(),
          amount,
          "Balance wasn't 0 ether"
        )
    });
  });
});
const console = require("console");

const Ribon = artifacts.require("Ribon");
const RibonGov = artifacts.require("RibonGov");

contract("Ribon", accounts => {
  let ribonGov;
  let ribon;

  before(async function () {
    ribonGov = await RibonGov.deployed();
    ribon = await Ribon.deployed();
    console.log("accounts: " + accounts[0]);
  })

  it("should have Ribon name", async () => {
    const name = await ribon.name();
    assert.equal(
        name,
        "Ribon",
        "Name wasn't Ribon"
      )
  });

  describe("#getTotalStakedByIntegrations", async () => {      
    it("should return total staked by integrations", async () => {
      const totalStakedByIntegrations = await ribon.getTotalStakedByIntegrations();
      assert.equal(
          totalStakedByIntegrations.toString(),
          0,
          "Total staked should be 0"
        )
    });
  });

  describe("#stakeGovernanceTokensAsIntegration when stake correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribonGov.approve(ribon.address, amount)
      await ribon.stakeGovernanceTokensAsIntegration(amount)
    });
      
    it("should add the amount on total staked by integrations", async () => {
      const totalStaked = await ribon.getTotalStakedByIntegrations();
      assert.equal(
          totalStaked.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });

    it("should add the amount on integration staking balance", async () => {
      const totalStaked = await ribon.getIntegrationStakingBalance(accounts[0]);
      assert.equal(
          totalStaked.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });

    it("should change integraitonIsStaking to true", async () => {
      const integrationIsStaking = await ribon.getIntegrationIsStaking(accounts[0]);
      assert.equal(
          integrationIsStaking,
          true,
          "integrationIsStaking wasn't true"
        )
    });

    it("should change integraitonHasStaked to true", async () => {
      const integrationHasStaked = await ribon.getIntegrationHasStaked(accounts[0]);
      assert.equal(
          integrationHasStaked,
          true,
          "integrationIsStaking wasn't true"
        )
    });
  });

  describe("#unstakeGovernanceTokensAsIntegration when unstake correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribon.unstakeGovernanceTokensAsIntegration(amount)
    });
      
    it("should remove the amount on total staked by integrations", async () => {
      const totalStaked = await ribon.getTotalStakedByIntegrations();
      assert.equal(
          totalStaked.toString(),
          0,
          "Balance wasn't 0 ether"
        )
    });

    it("should add the amount on integration staking balance", async () => {
      const totalStaked = await ribon.getIntegrationStakingBalance(accounts[0]);
      assert.equal(
          totalStaked.toString(),
          0,
          "Balance wasn't 0 ether"
        )
    });

    it("should change integraitonIsStaking to false", async () => {
      const integrationIsStaking = await ribon.getIntegrationIsStaking(accounts[0]);
      assert.equal(
          integrationIsStaking,
          false,
          "integrationIsStaking wasn't false"
        )
    });
  });

  describe("#deposit when deposit correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribonGov.approve(ribon.address, amount)
      await ribon.stakeGovernanceTokensAsIntegration(amount)
      await ribonGov.approve(ribon.address, amount);
      await ribon.deposit(amount);
    });

    it("should distribute proportionally to integrations", async () => {
      const balance = await ribon.balanceOf(accounts[0]);
      assert.equal(
          balance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });
  });

  describe("#donate when donate correctly ", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    before(async function () {
      await ribon.donate(accounts[1], amount)
    });

    it("should send ribon governance tokens to ngo", async () => {
      const balance = await ribonGov.balanceOf(accounts[1]);
      assert.equal(
          balance.toString(),
          amount,
          "Balance wasn't 1 ether"
        )
    });

    it("should burn ribon tokens", async () => {
      const balance = await ribon.totalSupply();
      assert.equal(
          balance.toString(),
          0,
          "Total supply wasn't 0"
        )
    });
  });
});
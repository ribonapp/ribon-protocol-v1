const DonationToken = artifacts.require("DonationToken")
const Ribon = artifacts.require("Ribon")

module.exports = async function (deployer, network, accounts) {
  // Deploy DonationToken
  await deployer.deploy(DonationToken)
  const donationToken = await DonationToken.deployed()

  await deployer.deploy(Ribon, donationToken.address)
  const ribon = await Ribon.deployed()
}

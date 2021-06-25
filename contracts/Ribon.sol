// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Ribon {
    using SafeERC20 for IERC20;
    IERC20 public donationToken;

    uint256 public donationPoolBalance;
    uint256 public totalDonated;

    address[] nonProfits;

    struct user {
        uint256 balance;
        mapping(address => uint256) totalDonatedByNonProfit;
    }

    mapping(address => user) public users;

    struct integration {
        uint256 balance;
        mapping(address => uint256) totalDonatedByNonProfit;
    }

    mapping(address => integration) public integrations;

    constructor(address _donationToken) {
        donationToken = IERC20(_donationToken);
    }

    function getDonationPoolBalance() public view returns (uint256) {
        return donationPoolBalance;
    }

    function getTotalDonated() public view returns (uint256) {
        return totalDonated;
    }

    function getIntegrationBalance(address _integration)
        public
        view
        returns (uint256)
    {
        return integrations[_integration].balance;
    }

    function getUserBalance(address _user) public view returns (uint256) {
        return users[_user].balance;
    }

    function getUserImpactByNonProfit(address _user, address _nonProfit)
        public
        view
        returns (uint256)
    {
        return users[_user].totalDonatedByNonProfit[_nonProfit];
    }

    function deposit(uint256 _amount) public {
        donationPoolBalance = donationPoolBalance + _amount;
        donationToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function allowIntegrationDistribute(address _integration, uint256 _amount)
        public
    {
        donationPoolBalance = donationPoolBalance - _amount;
        integrations[_integration].balance =
            integrations[_integration].balance +
            _amount;
    }

    function donationThroughIntegration(
        address _nonProfit,
        address _user,
        uint256 _amount
    ) public {
        integrations[msg.sender].balance =
            integrations[msg.sender].balance -
            _amount;
        integrations[msg.sender].totalDonatedByNonProfit[_nonProfit] =
            integrations[msg.sender].totalDonatedByNonProfit[_nonProfit] +
            _amount;
        users[_user].totalDonatedByNonProfit[_nonProfit] =
            users[_user].totalDonatedByNonProfit[_nonProfit] +
            _amount;
        donationToken.safeTransfer(_nonProfit, _amount);
    }
}

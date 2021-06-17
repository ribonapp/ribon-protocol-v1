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
    mapping(address => uint256) public integrationBalance;
    mapping(address => uint256) public userBalance;

    constructor(address _donationToken) {
        donationToken = IERC20(_donationToken);
    }

    function getDonationPoolBalance() public view returns (uint256) {
        return donationPoolBalance;
    }

    function getIntegrationBalance(address _integration)
        public
        view
        returns (uint256)
    {
        return integrationBalance[_integration];
    }

    function getUserBalance(address _user) public view returns (uint256) {
        return userBalance[_user];
    }

    function deposit(uint256 _amount) public {
        donationPoolBalance = donationPoolBalance + _amount;
        donationToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function allowIntegrationDistribute(address _integration, uint256 _amount)
        public
    {
        donationPoolBalance = donationPoolBalance - _amount;
        integrationBalance[_integration] =
            integrationBalance[_integration] +
            _amount;
    }

    function allowUserDonate(address _user, uint256 _amount) public {
        userBalance[_user] = userBalance[_user] + _amount;
        integrationBalance[msg.sender] =
            integrationBalance[msg.sender] -
            _amount;
    }

    function donate(address _nonProfit, uint256 _amount) public {
        userBalance[msg.sender] = userBalance[msg.sender] - _amount;
        donationToken.safeTransfer(_nonProfit, _amount);
    }
}

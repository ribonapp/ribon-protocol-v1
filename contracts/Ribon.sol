// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Ribon {
    using SafeERC20 for IERC20;
    IERC20 public stableToken;

    uint256 public donationPoolBalance;

    constructor(address _stableToken) {
        stableToken = IERC20(_stableToken);
    }

    function getDonationPoolBalance() public view returns (uint256) {
        return donationPoolBalance;
    }

    function deposit(uint256 _amount) public {
        stableToken.safeTransferFrom(msg.sender, address(this), _amount);
        donationPoolBalance = donationPoolBalance + _amount;
    }
}

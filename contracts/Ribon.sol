// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Ribon is ERC20 {
    using SafeERC20 for IERC20;

    IERC20 public governanceToken;

    uint256 public totalStaked;

    constructor(address _governanceToken) ERC20("Ribon", "RBN") {
        governanceToken = IERC20(_governanceToken);
    }

    function balance() public view returns (uint256) {
        return governanceToken.balanceOf(address(this));
    }

    function stakeGovernanceTokens(uint256 _amount) public {
        governanceToken.safeTransferFrom(msg.sender, address(this), _amount);

        totalStaked = totalStaked + _amount;
    }

    function getTotalStaked() public view returns (uint256) {
        return totalStaked;
    }
}

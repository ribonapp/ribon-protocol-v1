// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Ribon is ERC20 {
    using SafeERC20 for IERC20;

    IERC20 public governanceToken;

    address[] public integrationStakers;
    uint256 public totalStakedByIntegrations;

    mapping(address => bool) public integrationIsStaking;
    mapping(address => bool) public integrationHasStaked;
    mapping(address => uint256) public integrationStakingBalance;

    constructor(address _governanceToken) ERC20("Ribon", "RBN") {
        governanceToken = IERC20(_governanceToken);
    }

    function getIntegrationStakers() public view returns (address[] memory) {
        return integrationStakers;
    }

    function getTotalStakedByIntegrations() public view returns (uint256) {
        return totalStakedByIntegrations;
    }

    function getIntegrationStakingBalance(address _integrationAddress)
        public
        view
        returns (uint256)
    {
        return integrationStakingBalance[_integrationAddress];
    }

    function getIntegrationIsStaking(address _integrationAddress)
        public
        view
        returns (bool)
    {
        return integrationIsStaking[_integrationAddress];
    }

    function getIntegrationHasStaked(address _integrationAddress)
        public
        view
        returns (bool)
    {
        return integrationHasStaked[_integrationAddress];
    }

    function stakeGovernanceTokensAsIntegration(uint256 _amount) public {
        governanceToken.safeTransferFrom(msg.sender, address(this), _amount);

        totalStakedByIntegrations = totalStakedByIntegrations + _amount;

        integrationStakingBalance[msg.sender] =
            integrationStakingBalance[msg.sender] +
            _amount;

        if (!integrationHasStaked[msg.sender]) {
            integrationHasStaked[msg.sender] = true;
            integrationIsStaking[msg.sender] = true;
            integrationStakers.push(msg.sender);
        }
    }

    function unstakeGovernanceTokensAsIntegration(uint256 _amount) public {
        governanceToken.safeTransfer(msg.sender, _amount);

        integrationStakingBalance[msg.sender] =
            integrationStakingBalance[msg.sender] -
            _amount;

        totalStakedByIntegrations = totalStakedByIntegrations - _amount;

        if (integrationStakingBalance[msg.sender] == 0) {
            integrationIsStaking[msg.sender] = false;
        }
    }

    function deposit(uint256 _amount) public {
        governanceToken.safeTransferFrom(msg.sender, address(this), _amount);

        for (uint256 i = 0; i < integrationStakers.length; i++) {
            address recipient = integrationStakers[i];
            if (integrationStakingBalance[recipient] > 0) {
                uint256 percentage =
                    integrationStakingBalance[recipient] /
                        totalStakedByIntegrations;
                uint256 numberOfTokens = _amount * percentage;

                _mint(recipient, numberOfTokens);
            }
        }
    }
}

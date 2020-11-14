pragma solidity ^0.5.16;

contract EliteRewardsDistributionRecipient {
    address public rewardsDistribution;

    function notifyRewardAmount(uint256 reward) external;

    modifier onlyRewardsDistribution() {
        require(msg.sender == rewardsDistribution, "Caller is not EliteRewardsDistribution contract");
        _;
    }
}

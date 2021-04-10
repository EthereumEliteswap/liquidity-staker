const EliteStakingRewardsFactory = artifacts.require("EliteStakingRewardsFactory");

// addresses[0]: 0x38589069B6F7c7FA8Fd2B7e5c6d14C11893E358d (Eliteswap: Deployer)

module.exports = async function (deployer, network, addresses) {
  let rewardsToken;
  let stakingRewardsGenesis;
  
  if (network === 'mainnet' || network === 'mainnet-fork') {
    rewardsToken = await '0x380291A9A8593B39f123cF39cc1cc47463330b1F'; // eltAddress
    stakingRewardsGenesis = await 1605484800; // 2020-11-16 02:00:00 +0200
  } else if (network === 'ropsten' || network === 'ropsten-fork') {
    rewardsToken = await '0x380291A9A8593B39f123cF39cc1cc47463330b1F'; // eltAddress
    stakingRewardsGenesis = await 1605484800; // 2020-11-16 02:00:00 +0200
  } else if (network === 'bsc_mainnet' || network === 'bsc_mainnet-fork') {
    rewardsToken = await '0x380291A9A8593B39f123cF39cc1cc47463330b1F'; // bsc mainnet ELTB Contract
    stakingRewardsGenesis = await 1618012800; // 2021-04-10 03:00:00 +0300
  } else if (network === 'bsc_testnet' || network === 'bsc_testnet-fork') {
    rewardsToken = await '0xbbAA1C83ea09b5cE0868E0171fE1898Cf7c3c291'; // bsc testnet ELTB Contract
    stakingRewardsGenesis = await 1618012800; // 2021-04-10 03:00:00 +0300
  } else {
    throw new Error('No Elite Swap on this network')
  }
  
  await deployer.deploy(EliteStakingRewardsFactory, rewardsToken, stakingRewardsGenesis);
};

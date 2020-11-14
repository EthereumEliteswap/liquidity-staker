import chai from 'chai'
import { Contract, Wallet, BigNumber, providers } from 'ethers'
import { solidity, deployContract } from 'ethereum-waffle'

import { expandTo18Decimals } from './utils'

import EliteswapV2ERC20 from '@eliteswap/v2-core/build/ERC20.json'
import TestERC20 from '../build/TestERC20.json'
import EliteStakingRewards from '../build/EliteStakingRewards.json'
import EliteStakingRewardsFactory from '../build/EliteStakingRewardsFactory.json'

chai.use(solidity)

const NUMBER_OF_STAKING_TOKENS = 4

interface EliteStakingRewardsFixture {
  stakingRewards: Contract
  rewardsToken: Contract
  stakingToken: Contract
}

export async function stakingRewardsFixture([wallet]: Wallet[]): Promise<EliteStakingRewardsFixture> {
  const rewardsDistribution = wallet.address
  const rewardsToken = await deployContract(wallet, TestERC20, [expandTo18Decimals(1000000)])
  const stakingToken = await deployContract(wallet, EliteswapV2ERC20, [expandTo18Decimals(1000000)])

  const stakingRewards = await deployContract(wallet, EliteStakingRewards, [
    rewardsDistribution,
    rewardsToken.address,
    stakingToken.address,
  ])

  return { stakingRewards, rewardsToken, stakingToken }
}

interface EliteStakingRewardsFactoryFixture {
  rewardsToken: Contract
  stakingTokens: Contract[]
  genesis: number
  rewardAmounts: BigNumber[]
  stakingRewardsFactory: Contract
}

export async function stakingRewardsFactoryFixture(
  [wallet]: Wallet[],
  provider: providers.Web3Provider
): Promise<EliteStakingRewardsFactoryFixture> {
  const rewardsToken = await deployContract(wallet, TestERC20, [expandTo18Decimals(1_000_000_000)])

  // deploy staking tokens
  const stakingTokens = []
  for (let i = 0; i < NUMBER_OF_STAKING_TOKENS; i++) {
    const stakingToken = await deployContract(wallet, TestERC20, [expandTo18Decimals(1_000_000_000)])
    stakingTokens.push(stakingToken)
  }

  // deploy the staking rewards factory
  const { timestamp: now } = await provider.getBlock('latest')
  const genesis = now + 60 * 60
  const rewardAmounts: BigNumber[] = new Array(stakingTokens.length).fill(expandTo18Decimals(10))
  const stakingRewardsFactory = await deployContract(wallet, EliteStakingRewardsFactory, [rewardsToken.address, genesis])

  return { rewardsToken, stakingTokens, genesis, rewardAmounts, stakingRewardsFactory }
}

const solanaWeb3 = require('@solana/web3.js');

const Solana = new solanaWeb3.Connection(
    "https://free.rpcpool.com"
);

const stakeAccountAddress = new solanaWeb3.PublicKey("4FPaiX7MwHkApc9Yia5oFa2rFQvMdp3146C8PP8CNJtv");
const getInflationReward = async () => {
    const rewardInfo = await Solana.getInflationReward([stakeAccountAddress])
    const reward = rewardInfo[0].amount
    const postBalance = rewardInfo[0].postBalance
    const oldBalance = postBalance - reward
    const rewardPercentage = (reward / oldBalance) * 100
    console.log("~~~~Old balance:", (oldBalance / 1000000000), "SOL");
    console.log("~~~~New balance:", (postBalance / 1000000000), "SOL");
    console.log("~~~~Reward:", (reward / 1000000000), "SOL");
    console.log("~~~~rewardPercentage:", rewardPercentage, "%");
}
getInflationReward();

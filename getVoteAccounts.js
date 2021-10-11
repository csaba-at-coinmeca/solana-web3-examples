const solanaWeb3 = require('@solana/web3.js');

const Solana = new solanaWeb3.Connection(
    "https://free.rpcpool.com"
);

const getVoteAccounts = async () => {
    const voteAccounts = await Solana.getVoteAccounts()
    let voteAccount = voteAccounts.current.filter(it => it.votePubkey == "BFx4GGeS6s66HGux6oy7jMwiKPu6sUAJrzhK89wHun6R")[0]
    console.log("~~Validator:");
    console.log("~~~~Vote Account:", voteAccount.votePubkey);
    console.log("~~~~Node Identity:", voteAccount.nodePubkey);
    console.log("~~~~Active stakes:", (voteAccount.activatedStake / 1000000000).toLocaleString(), "SOL");
    console.log("~~~~Commission:", voteAccount.commission, "%");
}
getVoteAccounts();
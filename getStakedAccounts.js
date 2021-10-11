const solanaWeb3 = require('@solana/web3.js');

const Solana = new solanaWeb3.Connection(
    "https://free.rpcpool.com"
);

const walletAddress = new solanaWeb3.PublicKey("DtWfJt7HA1Z5ZNpDBR8EeaqzZ8tF3bA1S6agkWyfNN9E");

const getStakeAccounts = async () => {
    const parsedStakeAccounts = await Solana.getParsedProgramAccounts(
        solanaWeb3.StakeProgram.programId,
        {
            filters: [
                { dataSize: 200 },
                {
                    memcmp: {
                        offset: 12,
                        bytes: walletAddress.toBase58()
                    }
                }
            ]
        });
    console.log("~~~~parsedStakeAccounts:", parsedStakeAccounts);

    parsedStakeAccounts.forEach(({ pubkey, account }) => {
        console.log("Account pubkey: ", pubkey.toBase58());
        console.log('parsed' in account?.data ? account?.data.parsed : "Does not contain parsed data");
        if ('parsed' in account?.data) {
            console.log("Staker: ", account.data.parsed.info.meta.authorized.staker);
            console.log("Withdrawer: ", account.data.parsed.info.meta.authorized.withdrawer);
            console.log("Staked amount: ", (account.lamports / 1000000000))
        }

    });
}
getStakeAccounts();
const { Alchemy, Network } = require('@alch/alchemy-sdk');

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

exports.getTransactions = async (walletAddress) => {
  return await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: "latest",
    fromAddress: walletAddress,
    category: ["external", "internal", "erc20", "erc721"],
  });
};

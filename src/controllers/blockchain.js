const { getTransactions } = require('../services/alchemy');

exports.getWalletTransactions = async (req, res) => {
  try {
    const transactions = await getTransactions(req.params.walletAddress);
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

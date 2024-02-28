import axios from 'axios';

const WEB3_API_KEY = process.env.WEB3_API_KEY;

export async function fetchTransactions(walletAddress: string): Promise<string[]> {
  const url = `https://api.yourweb3provider.com/eth/v1/...`; // Replace with your actual Web3 provider URL
  const response = await axios.get(url, {
    params: {
      address: walletAddress,
      apiKey: WEB3_API_KEY,
      limit: 1000,
    },
  });

  return response.data.transactions.map((tx: any) => tx.contractAddress);
}

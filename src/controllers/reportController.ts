// src/controllers/reportController.ts
import { Request, Response } from 'express';
import { authenticateApiKey } from '../utils/authentication';
import { fetchTransactions } from '../services/ethereumService';
import { storeTransactions } from '../services/databaseService';
import { generateReport } from '../services/reportService';

export async function getReport(req: Request, res: Response) {
  try {
    const walletAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const transactions = await fetchTransactions(walletAddress);
    await storeTransactions(transactions);
    const report = await generateReport();

    res.json({ report });
  } catch (error) {
    console.error('Error processing report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const reportController = {
  getReport,
};

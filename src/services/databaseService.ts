import { createClient, SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'your_supabase_url';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || 'your_supabase_api_key';

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export async function storeTransactions(contractAddresses: string[]): Promise<void> {
  try {
    const transactions = contractAddresses.map((contractAddress) => ({ contractAddress }));
    const sql = `
      INSERT INTO transactions (contractAddress)
      VALUES ${transactions.map((_, index) => `($${index + 1})`).join(', ')}
      ON CONFLICT (contractAddress) DO NOTHING
    `;
    const { data, error } = await supabase.rpc('execute', { sql, params: transactions.map((t) => t.contractAddress) });

    if (error) {
      console.error('Error storing transactions:', error);
      throw error;
    }
  } catch (error) {
    console.error('Unexpected error storing transactions:', error);
    throw error;
  }
}

import { createClient, SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';


const SUPABASE_URL = process.env.SUPABASE_URL || 'your_supabase_url';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || 'your_supabase_api_key';

interface Transaction {
  contractAddress: string;

}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export async function generateReport(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('contractAddress')
      .order('contractAddress', { ascending: true }) as PostgrestResponse<Transaction>; // Explicitly cast the result

    if (error) {
      console.error('Error generating report:', error);
      return [];
    }

    const groupedData = groupBy(data, 'contractAddress');
    const result = Object.entries(groupedData).map(([contractAddress, entries]) => ({
      contractAddress,
      count: (entries as Transaction[]).length,
    }));

    return result.map((entry) => `${entry.contractAddress} (Count: ${entry.count})`);
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
}


function groupBy(array: Transaction[], key: string) {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {});
}

async function exampleUsage(): Promise<void> {
  const result = await generateReport();
  console.log(result);
}


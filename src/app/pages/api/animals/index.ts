import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/app/database/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
	const { data, error } = await supabase.from('animals').select('*');
	if (error) return res.status(500).json({ error: error.message });
	return res.status(200).json(data);
  }
}
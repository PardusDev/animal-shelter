import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/app/database/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
	const {status } = req.body;
	const {error} = await supabase.from('animals').update({ status }).eq('id', id);
	if (error) return res.status(500).json({ error: error.message });
	return res.status(200).json({ message: 'Status updated successfully' });
  }
}
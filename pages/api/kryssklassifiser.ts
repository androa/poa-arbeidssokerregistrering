import type { NextApiRequest, NextApiResponse } from 'next';

async function kryssklassifiser(req: NextApiRequest, res: NextApiResponse<string>) {
    const styrkKode = req.query.styrkKode;
    const url = `${process.env.KRYSSKLASSIFISER_URL}?kodeForOversetting=${styrkKode}`;
    const response = await fetch(url);
    const json = await response.json();
    res.status(200).json(json);
}

export default kryssklassifiser;
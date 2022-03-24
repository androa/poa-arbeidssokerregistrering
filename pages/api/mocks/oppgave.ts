import type { NextApiRequest, NextApiResponse } from 'next';

const oppgave = (req: NextApiRequest, res: NextApiResponse): void => {
    res.status(200).json({
        id: 308030803,
        tildeltEnhetsnr: 1503,
        data: {
            telefonnummerHosKrr: '',
            telefonnummerHosNav: '',
        },
        response: '',
    });
};

export default oppgave;

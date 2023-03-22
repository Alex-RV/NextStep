import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).send({ message: 'Only GET requests allowed' })
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAILL,
                private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets'
            ]
        })

        const sheets = google.sheets({version: 'v4', auth});

        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
                range: 'A1:K5000',
            });
            console.log("VAlues!!:",response.data.values)
            const numRows = response.data.values ? response.data.values.length : 0;
            console.log(`${numRows} rows retrieved.`);
            res.status(201).json({
                data: response.data
            })
        } catch (err) {
            throw err;
        }
        
        }catch (e) {
            return res.status(e.code).send({message: e.message})
        }
}
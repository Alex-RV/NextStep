import type { NextApiRequest, NextApiResponse } from 'next'
import {google} from "googleapis";

type SheetForm={
    first: string
    last: string
    pronouns: string
    email: string
    phone: string
    birth: string
    residence: string
    education: string
    experience: string
    goals: string
    interests: string[]
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' })
    }

    const body = req.body as SheetForm

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

        const sheets = google.sheets({
            auth,
            version: 'v4'
        });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_NAME,
            range: 'A1:D1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        body.first,
                        body.last,
                        body.pronouns,
                        body.email,
                        body.phone,
                        body.birth,
                        body.residence,
                        body.education,
                        body.experience,
                        body.goals,
                        body.interests.join(', '), // Join the interests array into a comma-separated string
                    ],
                ]
            }
        });

        return res.status(201).json({
            data: response.data
        })
    }catch (e) {
        return res.status(e.code).send({message: e.message})
    }

}
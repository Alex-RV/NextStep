import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

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

export async function addDataToSheet(req: NextApiRequest,res: NextApiResponse) {

    if(req.method !== 'POST'){
        return res.status(405).send({message: 'Only "POST"'})
    }

    const body = req.body as SheetForm;

    try {
        const auth = await google.auth.getClient({
            credentials: {
                client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'A1:L1',
            valueInputOption: "USER_ENTERED",
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
                ],
            },
        });
        console.log("SOmething happened")
        return res.status(200).json({data:response.data})

    } catch (e) {
        console.error(e)
        return res.status(500).send({message:'something went wrong'})
    }
}

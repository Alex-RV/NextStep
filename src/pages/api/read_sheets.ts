import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

// const getAuthData = async (searchValue: string, columnsData): Promise<number> => {
//     try {
//         columnsData.forEach((data, index) => {
//             if (data === searchValue){
//                 return console.log([data, index])
//             }
//             else { return console.log(data," not found there")}
//         });
//     } catch (error) {
//       console.error(`Error retrieving row number: ${error}`);
//       return null;
//     }
//   };

const getAuthData = async (searchValue: string, columnsData: string[]): Promise<number> => {
    try {
      for (let i = 0; i < columnsData.length; i++) {
        if (columnsData[i] === searchValue) {
          return i;
        }
      }
      return null;
    } catch (error) {
      console.error(`Error retrieving row number: ${error}`);
      return null;
    }
  };
  

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
        
        const searchValue = req.query.searchValue as string;
        const range = req.query.range as string;
        const column = req.query.column as string;

        const sheets = google.sheets({version: 'v4', auth});
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
                range: column,
            });
            console.log("VAlues!!:",response.data.values)
            const columnsData = response.data.values ? response.data.values.flat() : [];
            console.log(`${columnsData.length} col retrieved.`);
            try {
                    const rowNumber = await getAuthData(searchValue, columnsData);
                    if (rowNumber !== null) {
                      return res.status(200).json({ rowNumber });
                    } else {
                      return res.status(404).send({ message: "Row not found" });
                    }
                  } catch (e) {
                    return res.status(500).send({ message: "Server error" });
                  }

        } catch (err) {
            throw err;
        }
        
        }catch (e) {
            return res.status(e.code).send({message: e.message})
        }
}
import { isEmpty } from "@firebase/util";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

const getRowNumber = async (searchValue: string, columnsData: string[]): Promise<number[]> => {
    try {
        const rows: number[] = [];
        columnsData.forEach((data, index) => {
            if (data === searchValue){
                rows.push(index+1) //to get the number of row in sheets(D:row)
            }
        });
        if (isEmpty(rows)){console.error(searchValue, " is not found")}
        return rows;
    } catch (error) {
      console.error(`Error retrieving row number: ${error}`);
      return null;
    }
  };

const getUserData = async (rowNumber, sheets): Promise<string[]> =>{
    try {
        let userData: string[] = [];
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
            range: `A${rowNumber}:K${rowNumber}`,
        });
        
        userData = response.data.values.flat()
        if (!userData){
            console.error(`Error in reading user data from sheet`);
            return null
        }
        return userData

    }catch (error) {
        console.error(`Error in getting user data: ${error}`);
        return null;
    }
}

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
            const columnsData = response.data.values ? response.data.values.flat() : [];
            console.log(`${columnsData.length} col retrieved.`);
            try {
                    const rowNumber = await getRowNumber(searchValue, columnsData);
                    console.log(rowNumber.length)
                    if (rowNumber && rowNumber.length === 1) {
                      const userData = await getUserData(rowNumber, sheets);
                      return res.status(200).json({ userData });
                    } else {
                      return res.status(404).send({ message: `Row not found or more that 1 row, rowNumber = ${rowNumber.length}` });
                    }
                  } catch (e) {
                    return res.status(500).send({ message: "Server error" });
                  }

        } catch (error) {
            throw error;
        }
        
        }catch (error) {
            return res.status(error.code).send({message: error.message})
        }
}

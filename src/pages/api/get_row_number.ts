import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";


export default async function getRowNumberByCellValue (searchValue: string): Promise<number> {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
          private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });
  
      const sheets = google.sheets({ version: "v4", auth });
  
      // Define the range of cells to retrieve, including the column that you want to search
      const range = "Sheet1!A:D";

      searchValue = "alexsandrr2005@gmail.com";
  
      // Define the query to search for the value in column D
      const query = `select * where D='${searchValue}'`;
  
      // Call the Sheets API to retrieve the matching row
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
        range: `${range} ${query}`,
      });
  
      const rowIndex = response.data.values.findIndex((row) => row.includes(searchValue));
  
      return rowIndex + 1; // add 1 to convert from 0-indexed array to 1-indexed row number
    } catch (error) {
      console.error(`Error retrieving row number: ${error}`);
      return 0;
    }
  };
  
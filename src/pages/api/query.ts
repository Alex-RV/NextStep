import type { NextApiRequest, NextApiResponse } from "next"
// import {query} from '../components/Database/Database'

export default function queryDB(
    req: NextApiRequest,
    res: NextApiResponse<Object>
){
    // query()
    res.status(200).json({})
}


//   try {
    // Get the target spreadsheet ID
    // const response = await sheets.spreadsheets.get({ auth, spreadsheetName: SPREADSHEET_NAME });
    // const spreadsheetId = response.data.spreadsheetId;

    // Insert the data into the target Google Sheet
//     const range = 'Sheet1!A1:F1'; // Set the range of the cells to be updated
//     const valueInputOption = 'RAW'; // Set the value input option
//     const resource = {
//       values: [[
//         data.name,
//         data.last,
//         data.pronouns,
//         data.email,
//         data.phone,
//         data.birth,
//         data.residence,
//         data.education,
//         data.experience,
//         data.goals,
//         data.interests?.join(', '), // Convert the interests array to a string
//       ]],
//     };
//     const result = await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range,
//       valueInputOption,
//       resource,
//     });

//     console.log(`${result.data.updates.updatedCells} cells updated.`); // Print the number of updated cells
//   } catch (error) {
//     console.error(error);
//   }

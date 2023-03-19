import {createDB} from "../components/Database/Database"
import type { NextApiRequest, NextApiResponse } from "next"

export default function createFromDB(    
    req: NextApiRequest,
    res: NextApiResponse<Object>)
    {
    createDB()
    res.status(200).json({})
}



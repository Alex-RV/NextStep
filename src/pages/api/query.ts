import type { NextApiRequest, NextApiResponse } from "next"
// import {query} from '../components/Database/Database'

export default function queryDB(
    req: NextApiRequest,
    res: NextApiResponse<Object>
){
    // query()
    res.status(200).json({})
}
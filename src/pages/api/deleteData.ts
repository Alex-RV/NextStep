import type { NextApiRequest, NextApiResponse } from "next";
import { deleteData } from "../components/Database/Database";
import { table } from "console";

type deleteDB = {
    table:any
    id: number
};

export default function deleteFromDB(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  let body = req.body as deleteDB;
  deleteData(
    body.table,
    body.id
  );
  res.status(200).json({});
}

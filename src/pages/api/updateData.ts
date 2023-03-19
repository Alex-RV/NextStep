import type { NextApiRequest, NextApiResponse } from "next";
import { updateData } from "../components/Database/Database";

type updateData = {
    table:any
    change: any
    id: number
};

export default function updateDB(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  let body = req.body as updateData;
  updateData(
    body.table,
    body.change,
    body.id
  );
  res.status(200).json({});
}

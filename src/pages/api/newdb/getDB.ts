import type { NextApiRequest, NextApiResponse } from "next";
import { db, UserId, DatabaseEntry } from "./mod";

type GetDBIn = {
  user: UserId;
};

type GetDBOut = DatabaseEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetDBOut>
) {
  let body = req.body as GetDBIn;
  res.status(200).json(db.entries.get(body.user));
}

export async function getDB(inp: GetDBIn): Promise<GetDBOut> {
  let res = await fetch("/api/signalling/getDB", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inp),
  });
  return res.json();
}

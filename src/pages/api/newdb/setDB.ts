import type { NextApiRequest, NextApiResponse } from "next";
import { DatabaseEntry, db, UserId } from "./mod";

type SetDBIn = {
  user: UserId;
  data: DatabaseEntry;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  let body = req.body as SetDBIn;
  db.entries.set(body.user, body.data);
  res.status(200).json({});
}

export async function setDB(inp: SetDBIn) {
  let res = await fetch("/api/signalling/setDB", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inp),
  });
  return res.json();
}

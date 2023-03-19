import type { NextApiRequest, NextApiResponse } from "next";
import { users, UserId, ChatRecord } from "./mod";

type GetChatIn = {
  mentee: UserId;
  mentour: UserId;
};

type GetChatOut = {
  records: ChatRecord[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  let body = req.body as GetChatIn;
  let pair = {
    mentee: body.mentee,
    mentour: body.mentour,
  };
  if (!users.data.has(pair)) {
    users.data.set(pair, []);
  }
  res.status(200).json({
    records: users.data.get(pair),
  });
}

export async function addChat(inp: GetChatIn): Promise<GetChatOut> {
  let res = await fetch("/api/signalling/getChat", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inp),
  });
  return res.json();
}

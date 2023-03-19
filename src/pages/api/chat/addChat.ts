import type { NextApiRequest, NextApiResponse } from "next";
import { users, UserId } from "./mod";

type AddChatIn = {
  sender: UserId;
  mentee: UserId;
  mentour: UserId;
  text: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  let body = req.body as AddChatIn;
  let pair = {
    mentee: body.mentee,
    mentour: body.mentour,
  };
  if (!users.data.has(pair)) {
    users.data.set(pair, []);
  }
  users.data.get(pair).push({ sender: body.sender, text: body.text });
  res.status(200).json({});
}

export async function addChat(inp: AddChatIn) {
  await fetch("/api/signalling/addChat", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inp),
  });
    
}


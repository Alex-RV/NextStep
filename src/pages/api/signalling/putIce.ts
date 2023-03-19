import { signalling } from "./mod";
import type { NextApiRequest, NextApiResponse } from "next";

export interface PutIceIn {
  who: string;
  ice: RTCIceCandidate;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  console.log("putIce");
  let body = req.body as PutIceIn;
  if (!signalling.ices.has(body.who)) {
    signalling.ices.set(body.who, {
      ice: [],
      ice_idx: 0,
    });
  }
  let ices = signalling.ices.get(body.who);
  ices.ice.push(body.ice);
  res.status(200).json({});
}

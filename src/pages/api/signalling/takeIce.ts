import { signalling } from "./mod";
import type { NextApiRequest, NextApiResponse } from "next";

export interface TakeIceIn {
  who: string;
}

export interface TakeIceOut {
  ice: RTCIceCandidate[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TakeIceOut>
) {
  console.log("takeIce");
  let body = req.body as TakeIceIn;
  if (!signalling.ices.has(body.who)) {
    signalling.ices.set(body.who, {
      ice: [],
      ice_idx: 0,
    });
  }

  let ices = signalling.ices.get(body.who);

  if (ices.ice.length == 0) {
    res.status(200).json({
      ice: [],
    } as TakeIceOut);
  } else {
    res.status(200).json({
      ice: ices.ice.slice(ices.ice_idx, ices.ice.length - 1),
    } as TakeIceOut);
    ices.ice_idx = ices.ice.length - 1;
  }
}

import { signalling, type SignallingOffer } from "./mod";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<SignallingOffer[]>
) {
  console.log("getOffers");
  res.status(200).json(signalling.offers);
}

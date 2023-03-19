import { signalling } from "./mod";
import type { NextApiRequest, NextApiResponse } from "next";

export type MentourAcceptOfferIn = {
  sdp: Object;
  mentee: string;
  mentour: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
    console.log("mentourAcceptOffer");
  let body = req.body as MentourAcceptOfferIn;
  for (let offer of signalling.offers) {
    if (offer.mentee == body.mentee && offer.mentour == body.mentour) {
      res.status(200).json({});
      offer.offer.mentour_sdp = body.sdp;
      return;
    }
  }
  res.status(404).json({});
}

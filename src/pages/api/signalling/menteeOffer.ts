import { signalling } from "./mod";
import type { NextApiRequest, NextApiResponse } from "next";

export type MenteeOfferIn = {
  sdp: Object;
  mentee: string;
  mentour: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  console.log("menteeOffer");
  let body = req.body as MenteeOfferIn;
  signalling.offers.push({
    offer: {
      mentee_sdp: body.sdp,
      mentour_sdp: null,
      mentee_ice: [],
      mentour_ice: [],
    },
    mentee: body.mentee,
    mentour: body.mentour,
  });
  res.status(200).json({});
}

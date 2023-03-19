import { signalling } from "./mod";
import type { NextApiRequest, NextApiResponse } from "next";

export type MenteeTakeOfferIn = {
  mentee: string;
};

export type MenteeTakeOfferOut = {
  mentour_sdp: Object;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MenteeTakeOfferOut>
) {
  let body = req.body as MenteeTakeOfferIn;
  let i = 0;
  console.log("menteeTakeOffer");
  for (let offer of signalling.offers) {
    if (offer.mentour_sdp && offer.mentee == body.mentee) {
      res.status(200).json({
        mentour_sdp: offer.offer.mentour_sdp,
      } as MenteeTakeOfferOut);
      delete signalling.offers[i];
      return;
    }
    i += 1;
  }
  res.status(200).json({} as any);
}

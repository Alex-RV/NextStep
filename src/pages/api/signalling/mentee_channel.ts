import type { NextApiRequest, NextApiResponse } from "next";
import { getSignalling, setSignalling, signalling } from "./mod";

export interface MenteeChannelIn {
  mentee: string;
  mentour: string;
  reset: boolean;
  new_ice: RTCIceCandidate | null;
  new_sdp: string | null;
}

export interface MenteeChannelOut {
  new_ices: RTCIceCandidate[];
  take_connection_sdp: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MenteeChannelOut>
) {
  // let signalling = await getSignalling();
  let body = req.body as MenteeChannelIn;

  if (!signalling.users.has(body.mentee)) {
    signalling.users.set(body.mentee, {
      sdp: null,
      current_ice: [],
      current_ice_idx: 0,
    });
  }
  if (!signalling.users.has(body.mentour)) {
    signalling.users.set(body.mentour, {
      sdp: null,
      current_ice: [],
      current_ice_idx: 0,
    });
  }
  signalling.mentours_connect.set(body.mentour, body.mentee);
  let self = signalling.users.get(body.mentee);
  let other = signalling.users.get(body.mentour);

  if (body.new_ice) {
    self.current_ice.push(body.new_ice);
  }

  if (body.new_sdp) {
    console.log(self);
    self.sdp = body.new_sdp;
  }

  signalling.users.set(body.mentee, self);

  let take_connection_sdp = null;
  let new_ices = null;
  take_connection_sdp = other.sdp;
  new_ices =
    other.current_ice.length != 0
      ? other.current_ice.slice(
          other.current_ice_idx,
          other.current_ice.length - 1
        )
      : [];
  console.log("e", body, signalling);

  // setSignalling(signalling);
  res.status(200).json({
    take_connection_sdp,
    new_ices,
  } as MenteeChannelOut);
}

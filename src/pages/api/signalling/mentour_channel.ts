import type { NextApiRequest, NextApiResponse } from "next";
import { getSignalling, setSignalling, signalling } from "./mod";

export interface MentourChannelIn {
  who: string;
  reset: boolean;
  new_ice: RTCIceCandidate | null;
  new_sdp: string | null;
}

export interface MentourChannelOut {
  new_ices: RTCIceCandidate[];
  take_connection_sdp: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MentourChannelOut>
) {
  // let signalling = await getSignalling();
  let body = req.body as MentourChannelIn;

  if (!signalling.users.has(body.who)) {
    signalling.users.set(body.who, {
      sdp: null,
      current_ice: [],
      current_ice_idx: 0,
    });
  }
  let self = signalling.users.get(body.who);

  if (body.new_ice) {
    self.current_ice.push(body.new_ice);
  }

  if (body.new_sdp) {
    self.sdp = body.new_sdp;
  }

  signalling.users.set(body.who, self);

  let take_connection_sdp = null;
  let new_ices = null;

  console.log(signalling.mentours_connect, body.who);
  if (signalling.mentours_connect.has(body.who)) {
    let other = signalling.users.get(signalling.mentours_connect.get(body.who));
    take_connection_sdp = other.sdp;
    other.sdp = null;
    new_ices =
      other.current_ice.length != 0
        ? other.current_ice.slice(
            other.current_ice_idx,
            other.current_ice.length - 1
          )
        : [];
  }

  // setSignalling(signalling);
  res.status(200).json({
    take_connection_sdp,
    new_ices,
  } as MentourChannelOut);
}

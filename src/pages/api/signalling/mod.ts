import type { NextApiRequest, NextApiResponse } from "next";

interface ConnectData {
  sdp: string | null;
  current_ice: RTCIceCandidate[];
  current_ice_idx: number;
}

interface SignallingData {
  mentours_connect: Map<string, string>;
  users: Map<string, ConnectData>;
}

var signalling: SignallingData = {
  mentours_connect: new Map(),
  users: new Map(),
};

export { signalling, type SignallingData, type ConnectData };

export interface ModOut {
  val: SignallingData;
}

export interface ModIn {
  set: SignallingData | null;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ModOut>
) {
  let body = req.body as ModIn;
  if (body.set) {
    signalling = body.set;
  }
  res.status(200).json({
    val: signalling,
  } as ModOut);
}

export async function getSignalling(): Promise<SignallingData> {
  let res = await fetch("/api/signalling/mod", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function setSignalling(val: SignallingData) {
  await fetch("/api/signalling/mod", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      set: val,
    }),
  });
}

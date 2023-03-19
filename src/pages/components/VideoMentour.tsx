import { useEffect, useRef, useState } from "react";
import {
  MentourChannelIn,
  MentourChannelOut,
} from "../api/signalling/mentour_channel";

var peerConnectionConfig = {
  iceServers: [
    { urls: "stun:stun.stunprotocol.org:3478" },
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.l.google.com:19302" },
    {
      url: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
    {
      url: "turn:turn.bistri.com:80",
      credential: "homeo",
      username: "homeo",
    },
    {
      url: "turn:turn.anyfirewall.com:443?transport=tcp",
      credential: "webrtc",
      username: "webrtc",
    },
  ],
};

interface VideoMentourProps {
  mentour: string;
}

export default function VideoMentour(props: VideoMentourProps) {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef(null);
  let peer: RTCPeerConnection = null;

  let [channelInterval, setChannelInterval] = useState(null);

  let handleChannelRes = (channelOut: MentourChannelOut) => {
    console.log(channelOut, peer);
    if (peer) {
      if (channelOut.take_connection_sdp) {
        console.log("o got sdp");
        peer.setRemoteDescription(
          new RTCSessionDescription({
            type: "answer",
            sdp: channelOut.take_connection_sdp,
          })
        );
        peer
          .createAnswer()
          .then((desc) => {
            console.log("o answered");
            peer.setLocalDescription(desc);
            channel({
              reset: false,
              who: props.mentour,
              new_sdp: desc.sdp,
            } as MentourChannelIn)
              .then(handleChannelRes)
              .catch(handleError);
          })
          .catch(handleError);
      } else if (channelOut.new_ices) {
        channelOut.new_ices.forEach((ice) => {
          console.log("o got ice 2");
          peer.addIceCandidate(ice);
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (channelInterval) {
        clearInterval(channelInterval);
        setChannelInterval(null);
      }
    };
  }, [channelInterval]);

  return (
    <>
      <video
        width={640}
        height={480}
        playsInline={true}
        autoPlay={true}
        ref={localVideo}
      ></video>
      <video
        width={640}
        height={480}
        playsInline={true}
        autoPlay={true}
        ref={remoteVideo}
      ></video>
      <button
        onClick={() => {
          // channel({
          // reset: true,
          // reset: false,
          // who: props.mentour,
          // } as MentourChannelIn)
          // .then(handleChannelRes)
          // .catch(handleError);
          //  Local Video
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              localVideo.current.srcObject = stream;

              peer = new RTCPeerConnection(peerConnectionConfig as any);
              stream.getTracks().forEach((track) => peer.addTrack(track));
              peer.addEventListener("icecandidate", (e) => {
                console.log("o got ice");
                channel({
                  reset: false,
                  who: props.mentour,
                  new_ice: e.candidate,
                } as MentourChannelIn)
                  .then(handleChannelRes)
                  .catch(handleError);
              });
              peer.addEventListener("track", (e) => {
                console.log("o got track");
                if (remoteVideo.current.srcObject !== e.streams[0]) {
                  remoteVideo.current.srcObject = e.streams[0];
                }
              });
              let interval = setInterval(() => {
                channel({
                  reset: false,
                  who: props.mentour,
                } as MentourChannelIn)
                  .then(handleChannelRes)
                  .catch(handleError);
              }, 4000);
              setChannelInterval(interval);
            })
            .catch(handleError);
        }}
      >
        Begin
      </button>
    </>
  );
}

function handleError(e: any) {
  console.error(e);
}

async function channel(inp: MentourChannelIn): Promise<MentourChannelOut> {
  let res = await fetch("/api/signalling/mentour_channel", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inp),
  });
  return await res.json();
}

import { useEffect, useRef, useState } from "react";
import {
  MenteeChannelOut,
  MenteeChannelIn,
} from "../api/signalling/mentee_channel";

interface VideoMenteeProps {
  mentee: string;
  mentour: string;
}

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

function VideoMentee(props: VideoMenteeProps) {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef(null);
  let peer: RTCPeerConnection = null;

  let [channelInterval, setChannelInterval] = useState(null);

  let handleChannelRes = (channelOut: MenteeChannelOut) => {
    if (peer) {
      if (channelOut.take_connection_sdp) {
        console.log("e got sdp");
        peer.setRemoteDescription(
          new RTCSessionDescription({
            type: "answer",
            sdp: channelOut.take_connection_sdp,
          })
        );
      } else if (channelOut.new_ices) {
        console.log("e got ice 2");
        channelOut.new_ices.forEach((ice) => {
          peer.addIceCandidate(ice);
        });
      }
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      channel({
        reset: false,
        mentee: props.mentee,
        mentour: props.mentour,
      } as MenteeChannelIn)
        .then(handleChannelRes)
        .catch(handleError);
    }, 4000);
    setChannelInterval(interval);
    return () => {
      clearInterval(channelInterval);
      setChannelInterval(null);
    };
  }, []);

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
          channel({
            // reset: true,
            reset: false,
            mentee: props.mentee,
            mentour: props.mentour,
          } as MenteeChannelIn)
            .then(handleChannelRes)
            .catch(handleError);
          //  Local Video
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              localVideo.current.srcObject = stream;

              //  Offer to Mentour
              peer = new RTCPeerConnection(peerConnectionConfig as any);
              peer
                .createOffer()
                .then((desc) => {
                  console.log("offered");
                  peer.setLocalDescription(desc);
                  channel({
                    reset: false,
                    mentee: props.mentee,
                    mentour: props.mentour,
                    new_sdp: desc.sdp,
                  } as MenteeChannelIn)
                    .then(handleChannelRes)
                    .catch(handleError);
                })
                .catch(handleError);
              stream.getTracks().forEach((track) => peer.addTrack(track));
              peer.addEventListener("icecandidate", (e) => {
                console.log("e got ice");
                channel({
                  reset: false,
                  mentee: props.mentee,
                  mentour: props.mentour,
                  new_ice: e.candidate,
                } as MenteeChannelIn)
                  .then(handleChannelRes)
                  .catch(handleError);
              });
              peer.addEventListener("track", (e) => {
                console.log("e got track");
                if (remoteVideo.current.srcObject !== e.streams[0]) {
                  remoteVideo.current.srcObject = e.streams[0];
                }
              });
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

async function channel(inp: MenteeChannelIn): Promise<MenteeChannelOut> {
  let res = await fetch("/api/signalling/mentee_channel", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inp),
  });
  return await res.json();
}

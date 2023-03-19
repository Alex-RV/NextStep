import { useEffect, useRef, useState } from "react";
import { MenteeOfferIn } from "../api/signalling/menteeOffer";
import { PutIceIn } from "../api/signalling/putIce";
import { TakeIceIn, TakeIceOut } from "../api/signalling/takeIce";
import {
  MenteeTakeOfferOut,
  MenteeTakeOfferIn,
} from "../api/signalling/menteeTakeOffer";

interface VideoComponentProps {
  mentour: string;
  mentee: string;
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

export default function VideoMenteeComponent(props: VideoComponentProps) {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  let [connectionAccpected, setConnectionAccepted] = useState(false);
  let [peer, setPeer] = useState<RTCPeerConnection | null>(null);
  let [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch(handleError);

    setInterval(() => {
      fetch("/api/signalling/takeIce", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          who: props.mentee,
        } as TakeIceIn),
      })
        .then((out_any: any) => {
          let out = out_any as TakeIceOut;
          if (peer) {
            for (let ice of out.ice) {
              peer.addIceCandidate(new RTCIceCandidate(ice));
            }
          }
        })
        .catch(handleError);
    }, 1000);
    setInterval(() => {
      if (connectionAccpected) {
        return;
      }
      fetch("/api/signalling/menteeTakeOffer", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentee: props.mentee,
        } as MenteeTakeOfferIn),
      })
        .then((out_any: any) => {
          let out = out_any as MenteeTakeOfferOut | null;
          if (out) {
            setConnectionAccepted(true);
            peer.setRemoteDescription(
              new RTCSessionDescription(out!.mentour_sdp as any)
            );
          }
        })
        .catch(handleError);
    }, 3000);
    return () => {};
  }, []);

  useEffect(() => {
    if (!localVideo.current) {
      console.error("localVideo.current is null?");
    }
    (localVideo.current! as HTMLVideoElement).srcObject = localStream;

    let peer = new RTCPeerConnection(peerConnectionConfig as any);
    peer.onicecandidate = (ice) => {
      if (ice.candidate) {
        fetch("/api/signalling/putIce", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            who: props.mentee,
            ice: ice.candidate,
          } as PutIceIn),
        })
          .then((_) => {})
          .catch(handleError);
      }
    };
    peer.ontrack = (e) => {
      remoteVideo.current.srcObject = e.streams[0];
    };

    peer
      .createOffer()
      .then((desc) => {
        peer
          .setLocalDescription(desc)
          .then(() => {
            fetch("/api/signalling/menteeOffer", {
              method: "POST",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mentee: props.mentee,
                mentour: props.mentour,
                sdp: peer.localDescription,
              } as MenteeOfferIn),
            })
              .then((_) => {})
              .catch(handleError);
          })
          .catch(handleError);
      })
      .catch(handleError);

    return () => {};
  }, [localStream]);

  return (
    <div>
      <video id="localVideo" ref={localVideo} />
      <video id="remoteVideo" ref={remoteVideo} />
    </div>
  );
}

function handleError(e: any) {
  console.error(e);
}

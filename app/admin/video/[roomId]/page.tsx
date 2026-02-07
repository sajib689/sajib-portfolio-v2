"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Mic, MicOff, Video, VideoOff, PhoneOff, User } from "lucide-react";

export default function VideoCallPage({ params }: { params: { roomId: string } }) {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<any>(null);

    useEffect(() => {
        const initPeer = async () => {
            const { default: Peer } = await import("peerjs");
            const peer = new Peer();
            peerRef.current = peer;

            peer.on("open", (id) => {
                console.log("My peer ID is: " + id);
                // In a real app, you'd signal this ID via Socket.io
            });

            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
                setStream(currentStream);
                if (myVideoRef.current) myVideoRef.current.srcObject = currentStream;

                peer.on("call", (call) => {
                    call.answer(currentStream);
                    call.on("stream", (remoteStream) => {
                        setRemoteStream(remoteStream);
                        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
                    });
                });

                // For simplicity in this demo, we assume the roomId IS the peerId of the other person
                // or we use a separate signaling logic.
            });
        };

        initPeer();

        return () => {
            if (stream) stream.getTracks().forEach(track => track.stop());
            if (peerRef.current) peerRef.current.destroy();
        };
    }, []);

    const toggleMic = () => {
        if (stream) {
            stream.getAudioTracks()[0].enabled = !micOn;
            setMicOn(!micOn);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks()[0].enabled = !videoOn;
            setVideoOn(!videoOn);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Remote Video */}
                <div className="relative aspect-video bg-muted/20 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center">
                    {remoteStream ? (
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                <User size={40} className="text-white/20" />
                            </div>
                            <p className="text-sm text-white/40 font-medium">Waiting for participant...</p>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
                        Participant
                    </div>
                </div>

                {/* Local Video */}
                <div className="relative aspect-video bg-muted/20 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center">
                    <video ref={myVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
                        You (Admin)
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="py-8 flex justify-center gap-6">
                <button
                    onClick={toggleMic}
                    className={`p-5 rounded-full transition-all ${micOn ? "bg-white/10 hover:bg-white/20" : "bg-destructive text-white"}`}
                >
                    {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </button>
                <button
                    onClick={toggleVideo}
                    className={`p-5 rounded-full transition-all ${videoOn ? "bg-white/10 hover:bg-white/20" : "bg-destructive text-white"}`}
                >
                    {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
                </button>
                <button
                    onClick={() => window.close()}
                    className="p-5 bg-destructive text-white rounded-full hover:opacity-90 transition-all scale-110"
                >
                    <PhoneOff size={24} />
                </button>
            </div>
        </div>
    );
}

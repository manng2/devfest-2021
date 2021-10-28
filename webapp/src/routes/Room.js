import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { faPhone, faVideo, faMicrophone, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v1 as uuid } from "uuid";
import Fab from '@mui/material/Fab';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CallEndIcon from '@mui/icons-material/CallEnd';

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    border-radius: 10px;
    width: 50%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);

  return (
    <StyledVideo playsInline autoPlay ref={ref} />
  );
}


const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");
    // socketRef.current = io.connect("https://api-kittyholic.herokuapp.com");
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit("join room", roomID);
      socketRef.current.on("all users", users => {
        const peers = [];
        const statuses = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          const status = localStorage.getItem('status');
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push(peer);
          statuses.push(status);
        })
        // setStatuses(statuses);
        setPeers(peers);
        // console.log('hello', statuses);
      })

      socketRef.current.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        })

        setPeers(users => [...users, peer]);
      });

      socketRef.current.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    })
    // turn off microphone
    // off();
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
    })

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.signal(incomingSignal);

    return peer;
  }

  function joinDrawing() {
    const link = window.location.href.split('?')[0] + '/drawing';
    window.open(link, '_blank');
  }

  return (
    <div className='video-call'>
      <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {
          peers.map((peer, index) => {
            return (
              <>
                <Video key={index} peer={peer} />
              </>
            );
          })
        }
        <div className='btn-control d-flex'>
          <Fab color="primary" className='mr-3 btn-in-video-call center-div cursor-pointer' center-div onClick={joinDrawing}>
            <BorderColorIcon />
          </Fab>
          <Fab color="primary" className='mr-3 btn-in-video-call center-div cursor-pointer' center-div>
            <KeyboardVoiceIcon />
          </Fab>
          <Fab color="primary" className='mr-3 btn-in-video-call center-div cursor-pointer' center-div>
            <CameraAltIcon />
          </Fab>
          <Fab color="primary" className='mr-3 btn-in-video-call center-div cursor-pointer' center-div style={{background: "red"}}>
            <CallEndIcon/>
          </Fab>
          {/* <div className='mr-3 btn-in-video-call center-div cursor-pointer' center-div onClick={joinDrawing}>
            <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>
          </div>
          <div className='mr-3 btn-in-video-call center-div cursor-pointer'>
            <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
          </div>
          <div className='mr-3 btn-in-video-call center-div cursor-pointer' center-div>
            <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
          </div>
          <div className='mr-3 btn-in-video-call btn-call-end center-div cursor-pointer' center-div>
            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
          </div> */}

          {/* <div class="btn" onClick={joinDrawing}>
            White board
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Room;
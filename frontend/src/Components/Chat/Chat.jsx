import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import TextContainer from "./TextContainer";
import Messages from "./Messages/Messages";
import InfoBar from "./InfoBar";
import Input from "./Input";
import axios from "axios";
import jwt_decode from "jwt-decode";

import "./Chat.scss";

let socket;

const Chat = (props) => {
  const [name, setName] = useState('visitor'+Date.now());
  const [room, setRoom] = useState('room');
  const [img, setImg] = useState('img');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [id, setID] = useState("");
  const ENDPOINT = 'localhost:5001';

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(
        `http://localhost:5000/profile/${props.idprofile}`
      );
       setRoom(response.data.username)
      
      }
    
    getUsers();
    // setName(props.current.username);
    setRoom("room")
    var token = localStorage.getItem("token");
    if (token !== null) {
      var decoded = jwt_decode(token);
      setName(decoded.username)
      setImg(decoded.imageUser)
      setID(decoded.id)
    }
  
   
    socket = io(ENDPOINT);
    socket.emit("join", {name, room, img }, (error) => {
      if (error) {
        alert(error);
      }
    });
  
  
  
  },[id]);
  

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div
        className="container card"
        style={{ flexDirection: "column", }}
      >
        <InfoBar room={room} />
        <Messages messages={messages} name={name}  img={img}/>
        {console.log(messages)}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};
const mapStateToprops = (state) => ({
  current: state.currentUser
});
export default connect(mapStateToprops)(Chat);

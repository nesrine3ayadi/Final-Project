import React from "react";
import jwt_decode from "jwt-decode";
import "./Message.scss";

import ReactEmoji from "react-emoji";
import { useState, useEffect } from "react";



const Message = ({ message: { text, user, img}, name }) => {
 
  
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName ) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="d-flex justify-content-end mb-4">
      {/* <p className="sentText pr-10">{trimmedName}</p> */}

      <div className="d-flex justify-content-start mb-4">
        <div className="messageText msg_cotainer">
          {ReactEmoji.emojify(text)}
          <span class="msg_time">{user}</span>
        </div>

        <div class="img_cont_msg">
          <img
            src={img}
            class="rounded-circle user_img_msg"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-start mb-4 reciver">
      <div class="img_cont_msg">
        <img
          src={img}
          class="rounded-circle user_img_msg"
        />
      </div>
      <div className="msg_cotainer_send">
        {ReactEmoji.emojify(text)}
        <span class="msg_time">{user}</span>
      </div>
    </div>
  );
};

export default Message;

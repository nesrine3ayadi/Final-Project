import React from 'react';

import './Input.scss';

const Input = ({ setMessage, sendMessage, message }) => (
  

 
  <form className="card-footer">
    <div className="input-group-append">
    <textarea
      className=" form-control type_msg"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <div className="input-group-append">
    <span class="input-group-text send_btn" onClick={e => sendMessage(e)}><i class="fas fa-location-arrow"></i></span>
   
    </div>
    </div>
  </form>
 
)

export default Input;
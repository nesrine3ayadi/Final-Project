import React, {useState} from 'react'
import { Player } from 'video-react';
import { Button, Modal } from 'react-bootstrap';

function ModalVideo() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <a  className="btn_1" onClick={handleShow}>
        Watch tutorial
        </a>
  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start Streaming</Modal.Title>
        </Modal.Header>
        <Player
      playsInline
      poster="/assets/poster.png"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
    <div className="icongroupe">
    <i class="fab fa-gratipay"></i>
    <i class="far fa-comments"></i>
    </div>
        <Modal.Footer>
         
         
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  export default ModalVideo ;
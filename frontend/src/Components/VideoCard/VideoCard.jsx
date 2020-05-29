import React, {useState} from 'react'
import './VideoCard.scss'
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import { Button, Modal } from 'react-bootstrap';

// 

function VideoCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <div class="videoo">
          <div class="example-2 cardvideo">
          
       <img className="modalimg" onClick={handleShow} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNrqO5DPqH9hy05Nqn_SSjXeiZ1LTe3CT9c2LWn6dgaZr5yiKC&usqp=CAU" />
       <p onClick={handleShow} > Video Title</p>
   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Title</Modal.Title>
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
  </div>
    
        {/* 
          <div class="wrapper">
            <div class="header">
              <div class="date">
                <span class="day">12</span>
                <span class="month">Aug</span>
                <span class="year">2016</span>
              </div>
              <ul class="menu-content">
                <li>
                  <a href="#" class="fa fa-bookmark-o"></a>
                </li>
                <li><a href="#" class="fa fa-heart-o"><i class="far fa-heart"></i><span>18</span></a></li>
                <li><a href="#" class="fa fa-comment-o"><i class="far fa-comments"></i><span>3</span></a></li>
              </ul>
            </div>
            <div class="data">
              <div class="content">
              <h1 class="title"><a href="#"> The sound of the Upside Down</a></h1>
                <a href="#" class="button">Watch Now</a>
              </div>
            </div>
          </div>
        </div>
        <div class="example-2 cardvideo">
          <div class="wrapper">
            <div class="header">
              <div class="date">
                <span class="day">12</span>
                <span class="month">Aug</span>
                <span class="year">2016</span>
              </div>
              <ul class="menu-content">
                <li>
                  <a href="#" class="fa fa-bookmark-o"></a>
                </li>
                <li><a href="#" class="fa fa-heart-o"><i class="far fa-heart"></i><span>18</span></a></li>
                <li><a href="#" class="fa fa-comment-o"><i class="far fa-comments"></i><span>3</span></a></li>
              </ul>
            </div>
            <div class="data">
              <div class="content">
              <h1 class="title"><a href="#"> The sound of the Upside Down</a></h1>
                <a href="#" class="button">Watch Now</a>
              </div>
            </div>
          </div>
        </div>
        <div class="example-2 cardvideo">
          <div class="wrapper">
            <div class="header">
              <div class="date">
                <span class="day">12</span>
                <span class="month">Aug</span>
                <span class="year">2016</span>
              </div>
              <ul class="menu-content">
                <li>
                  <a href="#" class="fa fa-bookmark-o"></a>
                </li>
                <li><a href="#" class="fa fa-heart-o"><i class="far fa-heart"></i><span>18</span></a></li>
                <li><a href="#" class="fa fa-comment-o"><i class="far fa-comments"></i><span>3</span></a></li>
              </ul>
            </div>
            <div class="data">
              <div class="content">
              <h1 class="title"><a href="#">The sound of the Upside Down</a></h1>
                <a href="#" class="button">Watch Now</a>
              </div>
            </div>
          </div>
        </div>
        <div class="example-2 cardvideo">
          <div class="wrapper">
            <div class="header">
              <div class="date">
                <span class="day">12</span>
                <span class="month">Aug</span>
                <span class="year">2016</span>
              </div>
              <ul class="menu-content">
                <li>
                  <a href="#" class="fa fa-bookmark-o"></a>
                </li>
                <li><a href="#" class="fa fa-heart-o"><i class="far fa-heart"></i><span>18</span></a></li>
                <li><a href="#" class="fa fa-comment-o"><i class="far fa-comments"></i><span>3</span></a></li>
              </ul>
            </div>
            <div class="data">
              <div class="content">
              <h1 class="title"><a href="#">The sound of the Upside Down</a></h1>
                <a href="#" class="button">Watch Now</a>
              </div>
            </div>
          </div>
        </div> */}
      </div> 
    )
}

export default VideoCard

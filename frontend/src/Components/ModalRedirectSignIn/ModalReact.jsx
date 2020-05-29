import React, { Component } from "react";
import Modal from "react-modal";
import {Link} from "react-router-dom"

import "./ModalReact.scss"

class ModalReact extends Component {
  constructor(props) {
    super(props);

    this.state = {
     modalstate:false,
     newitemimage:"",
     newitemname:"",
     newitemrating:"",
     newitemyear:""
    };
  }
  closemodal = () =>{this.setState({modalstate:false})}
  openmodal  = () =>{this.setState({modalstate:true})}
  componentDidMount()
  {
      this.openmodal()
  }

  render() {

    return (
      <div>
       
       
        <Modal
          isOpen={this.state.modalstate}
          onRequestClose={this.closemodal}
          contentLabel="Minimal Modal Example"
          portalClassName="modal-react"
        >
          
        <div className="modal-flex">
          <h1 className="horror-title-modal">want to watch streaming videos ?  <br/>Sign In </h1>
          <div className="modal-buttons">
          <Link to="/home" > <button onClick={this.closemodal}>Close</button></Link> 
          <Link to ='/login'> <button >Sign In</button></Link> 
          </div>
        </div>
   
         
         
        </Modal>
      </div>
    );
  }
}
export default  ModalReact
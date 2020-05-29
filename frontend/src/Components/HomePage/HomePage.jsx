import React, { Fragment, useEffect } from "react";
import Navbar from "../Navbar/navbar2";
import ChannelCard from "../ChannelCard/ChannelCard";
import "./HopePage.scss";
import Sidebar from "../Sidebar/sidebar";
import { connect } from "react-redux";
import Axios from "axios"
import {displayUser} from "../../Actions/action"
import AllStreams from "../LiveStreaming/AllStreams";
import { useState } from "react";
import ModalVideo from './ModalVideo'
import Footer from '../Footer/footer'
//
function HomePage(props) {
   const [text, setText] = useState("")
  useEffect(()=>{
    async function getGamers()
    {
     const response = await Axios.get("http://localhost:5000/");
     props.displayUser(response.data)
    } 
     getGamers()
 
   },[props.users])

   const filtredData = props.users.filter(e => e.username.toLowerCase().includes(text))
  const  handleChange = (t) =>{
      setText (t)
      
  }
  return (
    <Fragment>
       <Navbar handle={handleChange} />
    
      <Sidebar />
      {/* <!-- banner part start--> */}
      <section className="banner_part">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 col-md-8">
              <div className="banner_text">
                <div className="banner_text_iner">
                  <h1>Best Streaming Platform</h1>
                  <p>
                   You can join Other gamers from all the world and share with them your stream
                  </p>
                  <ModalVideo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Channels Categories */}
      
      {/* <!-- pricing part start--> */}
      <section className="pricing_part">
        <div className="">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_tittle text-center">
                <h2>Best Channels</h2>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {
           filtredData.map((user) => (
            (user.role !== "admin"  && user.activate !==false) && (
              <div key={user._id} className="col-lg-4 col-sm-12 text-center" style={{ marginBottom: "30px"}}>
               
                <ChannelCard user={user} />
           
               
              </div>  )
            ))}
          </div>
        </div>
      </section>
      <section className="pricing_part padding_top">
        <AllStreams />
      </section>
      {/* <!-- pricing part end--> */}
      <Footer/>
    </Fragment>
  );
}
const mapStatetoProps = state => ({
  users: state.users.users,
});
export default connect(mapStatetoProps,{displayUser})(HomePage);

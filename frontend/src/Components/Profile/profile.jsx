import React, { useState, useEffect, Fragment } from "react";
import channelbanner from "../../img/channel-banner.png";
import s2 from "../../img/s2.png";
import Axios from "axios";
import { connect } from "react-redux";
import { displayCurrentUser } from "../../Actions/action";
import "./profile.scss";
import { Link } from "react-router-dom";
import ShowMore from 'react-show-more-list';
import { Tabs, Tab, Button} from 'react-bootstrap'
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import Navbar from "../Navbar/navbar2";
import Chat from "../Chat/Chat";
import VideoCard from "../VideoCard/VideoCard";
import StreamForm from "../LiveStreaming/StreamForm";
import StreamCreate from "../LiveStreaming/StreamCreate";
import StreamList from "../LiveStreaming/StreamList";
import ShowStreaming from "../LiveStreaming/ShowStreaming";
import jwt_decode from 'jwt-decode'
import AllStreams from "../LiveStreaming/AllStreams";

const Profile = (props) => {
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aboutUser, setAboutUser] = useState("");
  const [country, setCountry] = useState("");
  const [id, setID] = useState("");
  const [contentCreater, setContentCreater] = useState("")
  const [follower, setFollower] = useState("")
  const [ isfollow, setIsFollow] = useState("")
  const [listItems,setLisItems] = useState([])
  //
  useEffect(() => {
    async function getUser() {
      const response = await Axios.get(
        `http://localhost:5000/profile/${props.match.params.idUser}`
      );
      setProfileImg(response.data.imageUser);
      setCoverImg(response.data.imageCover)
      setUserName(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setAboutUser(response.data.aboutUser);
      setCountry(response.data.country);
      setID(response.data._id);
      setContentCreater(response.data)  
      setLisItems(response.data.followers) 

    }
    getUser();
    var token = localStorage.getItem('token')
    var decoded = jwt_decode(token)
    setFollower(decoded)
    if(listItems.find(e=>(e.id===follower.id))) 
    setIsFollow("unFollow") 
    else setIsFollow("Follow") 
   

  }, [props.match.params.idUser,isfollow,listItems]);

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };
  const addFollower = (id) => {

    Axios.put("http://localhost:5000/newFollower/" + id , follower )
    setIsFollow("unFollow")
  }
  const unFollow = (idContentCreater, idFollower) => {
    Axios.put("http://localhost:5000/deleteFollower/" + idContentCreater + "/" +idFollower  )
    setIsFollow("Follow")
  }

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("imageUser", profileImg);
    formData.append("imageCover",coverImg);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("aboutUser", aboutUser);
    formData.append("country", country);
    console.log(formData);
    Axios.put(
      `http://localhost:5000/${props.match.params.idUser}`,
      formData,
      {}
    ).then((res) => {
      console.log(res);
    });
  };


  return (
    <Fragment>
  <Navbar />
 
    <div className="row" id="profilePage">
      <div className="col-md-8 col-xs-12 col-sm-12" id="content-wrapper" >
        <div className="single-channel-image" style={{height:"300px", overflow:"hidden" }}>
          <img className="img-fluid" alt="" src={coverImg} />
          <div className="channel-profile">
            <img className="channel-profile-img" alt="" src={profileImg} />
            {username}
            {console.log("follower.id : "+ follower.id)}
            {console.log("contentCreater._id : "+ contentCreater._id)}
            {localStorage.getItem("token") !== null && (
              <div class="text-right">
                     <Button className="btnf" onClick={() => { (isfollow==="Follow") ?
                     ( addFollower(contentCreater._id)):
                     ( unFollow(contentCreater._id, follower.id))
            
                     }}  > 
                                          
                                 
                     {isfollow}
                    
                     </Button>
                
            
         
            </div>
            )}


          </div>
        
        </div>
        <Tabs defaultActiveKey="videos" id="uncontrolled-tab-example">
    
          <Tab eventKey="videos" title="Videos" className="streamtab">
              <StreamList  idUser = {id}/>
          </Tab>
          <Tab eventKey="donate" title="Donate" >
              Donate
          </Tab>
        </Tabs>
        
      </div>
       <div className="col-md-4 col-sm-12 col-xs-12" >
       <ShowMore
    items={listItems}
    by={5}
  >
    {({
      current,
      onMore,
    }) => (
      <React.Fragment>
        <ul>
          {current.map(item => (
            <li
              key={item.id}
            >
              <img src={item.imageUser} width="70" />
              {item.username}
            </li>
          ))}
        </ul>
        <button
          disabled={!onMore}
          onClick={() => { if (!!onMore) onMore(); }}
        >
          more
        </button>
      </React.Fragment>
    )}
  </ShowMore>
         
         </div>             
    </div>
   
    </Fragment>
  );
};
const mapStateToPops = (state) => ({ currentUser: state.currentUser, check: state.users.displayStream } 
  
  );
export default connect(mapStateToPops, { displayCurrentUser  })(Profile);

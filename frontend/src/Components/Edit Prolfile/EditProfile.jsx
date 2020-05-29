import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./EditProfile"
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import  Navbar  from '../Navbar/navbar2';

function EditProfile(props) {
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aboutUser, setAboutUser] = useState("");
  const [country, setCountry] = useState("");
  //
  useEffect(() => {
    async function getUser() {
      const response = await Axios.get(
        `http://localhost:5000/editProfile/${props.match.params.idUser}`
      );
      setProfileImg(response.data.imageUser);
      setCoverImg(response.data.imageCover)
      setUserName(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setAboutUser(response.data.aboutUser);
      setCountry(response.data.country);
    }
    getUser();
  }, [props.match.params.idUser]);

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

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
     <div class="row" style={{ paddingLeft: "50px"}}>

    
       
          
      
        <div className="single-channel-image col-md-8" style={{height:"300px", overflow:"hidden" }}>
          <img className="img-fluid" alt="" src={coverImg} />
          <div className="channel-profile">
            <img className="channel-profile-img" alt="" src={profileImg} />
          </div>
        </div>
        <FormControl className="col-md-8">
          <InputLabel htmlFor="usename">Username</InputLabel>
          <Input
            id="username"
            aria-describedby="my-helper-text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            Change your username.
          </FormHelperText>
        </FormControl>
        <FormControl className="col-md-8">
          <InputLabel htmlFor="Email">Email address</InputLabel>
          <Input
            id="Email"
            aria-describedby="my-helper-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText id="my-helper-text">Put your email.</FormHelperText>
        </FormControl>
        <FormControl className="col-md-8">
          <InputLabel htmlFor="Aboutuser">About me</InputLabel>
          <Input
            id="Aboutuser"
            aria-describedby="my-helper-text"
            value={aboutUser}
            onChange={(e) => setAboutUser(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            Write something about you
          </FormHelperText>
        </FormControl>
        <FormControl className="col-md-8">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            Change your password
          </FormHelperText>
        </FormControl>
        <FormControl className="col-md-8">
          <InputLabel htmlFor="password">Country</InputLabel>
          <Input
            aria-describedby="my-helper-text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            Where are you from ?
          </FormHelperText>
        </FormControl>
        <FormControl className="col-md-8">
          <form>
            <div className="form-group">
              <Input
                aria-describedby="my-helper-text"
                type="file"
                onChange={onFileChange}
              />
              <FormHelperText id="my-helper-text">
                change your profile picture
              </FormHelperText>
            </div>
            <div className="form-group">
              <Link to="/home">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={() => onSubmit()}
                >
                  update profile
                </button>
              </Link>
            </div>
          </form>
        </FormControl>
       
      
      </div>
     
      </Fragment>
    )
}

export default EditProfile

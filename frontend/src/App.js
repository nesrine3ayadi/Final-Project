import React, { useEffect } from "react";
import "./App.css";
import Register from "./Components/Registration/Register2";
import Login2 from "./Components/Login/Login2";
import { Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

import Profile from "./Components/Profile/profile";
import Join from "./Components/Chat/Join";
import Chat from "./Components/Chat/Chat";
import EditProfile from "./Components/Edit Prolfile/EditProfile";
import StreamShow from "./Components/LiveStreaming/ShowStreaming";
import StreamCreate from "./Components/LiveStreaming/StreamCreate";
import StreamDelete from "./Components/LiveStreaming/StreamDelete";
import StreamEdit from "./Components/LiveStreaming/StreamEdit";
import StreamList from "./Components/LiveStreaming/StreamList";
import Header from "./Components/LiveStreaming/Header";
import { Switch, Router, Redirect } from "react-router-dom";
import history from "./History";
import Dashboard from "./Components/Dashboard/dashboard";
import CreateStream from "./Components/CreateStream/CreateStream";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter"
import ModalReact from "./Components/ModalRedirectSignIn/ModalReact";
import Footer from "./Components/Footer/footer";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/register" component={Register}></Route>

          <Route exact path="/login" component={Login2}></Route>
          
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/home" component={HomePage}></Route>
          <ProtectedRouter exact path="/profile/:idUser" component={Profile}></ProtectedRouter>
          <Route exact path="/join" component={Join}></Route>
          
          <Route exact path="/editProfile/:idUser" component={EditProfile}></Route>
          <Route exact path="/createStream" component={CreateStream}></Route>
         
          <Route path="/" exact component={HomePage} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
           <Route exact path="/profile/:idUser/:id"  component={StreamShow} /> 
           <Route exact path="/signinmodal"  component={ModalReact} />
           <Route  path="*"  component={()=>"Error 404 not found "} />  
        </Switch>
      </Router>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;

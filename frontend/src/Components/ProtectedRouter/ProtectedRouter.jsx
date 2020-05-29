import React from "react";
import { Route, Redirect } from "react-router-dom";
import ModalReact from "../ModalRedirectSignIn/ModalReact";

function ProtectedRouter({ component: Component,...rest }) {
  return (
    <Route
    {...rest}
      render =
      {(props) => {
        if (localStorage.getItem("token") !== null) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/signinmodal", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRouter;

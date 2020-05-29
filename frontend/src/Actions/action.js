import streams from '../apis/Streams';
import history from "../History"
import jwt_decode from "jwt-decode";

export const displayUser = (payload)=> {
    return {
        type: "DISPLAY_USER",
        payload
    }
}

export const displayStream = ()=> {
    return {
        type: "DISPLAY_STREAM",
      
    }
}
export const activeButton  = (payload)=>{
    return {
        type:"ACTIVATE_BUTTON",
        payload
    }
}
export const contentCreater = (payload)=>{
    return {
        type:"CONTENT_CREATOR",
        payload
    }
}
export const displayCurrentUser = (payload)=> {
    return {
        type: "DISPLAY_CURRENT_USER",
        payload
    }
}

export const signIn = (userId) => {
    return {
        type: "SIGN_IN",
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT"
    };
};
export const fetchStream = (id) => async dispach => {
    const response = await streams.get('/streams/' + id);

    dispach({ type: "FETCH_STREAM", payload: response.data });
}

export const createStream = formValues => async (dispach, getState) => {
    var token = localStorage.getItem("token");
    
      var decoded = jwt_decode(token);
   
    
    const  Id  = decoded.id;
    const response = await streams.post('/streams', { ...formValues, Id });
   
    dispach({ type: "CREATE_STREAM", payload: response.data });
    const path = "/profile/" + Id + "/" + response.data.id   
     history.push(path);
};
// export const createStream = formValues => async (dispach, getState) => {
//     const { userId } = getState().auth;
//     const response = await streams.post('/streams', { ...formValues, userId });

//     dispach({ type: CREATE_STREAM, payload: response.data });

//     //programatic navitation after creating stream
//     history.push('/');
// };
export const fetchStreams = () => async dispach => {
    const response = await streams.get('/streams');

    dispach({ type: "FETCH_STREAMS", payload: response.data });
};


export const editStream = (id, formValues) => async dispach => {
    const response = await streams.patch('/streams/' + id, formValues);

    dispach({ type: "EDIT_STREAM", payload: response.data });

    
    history.push('/');
}

export const deleteStream = (id) => async dispach => {
    await streams.delete('/streams/' + id);

    dispach({ type: "DELETE_STREAM", payload: id });
    
    history.push('/');
}
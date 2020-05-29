import actions from "redux-form/lib/actions";

const initialState ={
users:[],
isActive: true
}

export default function (state = initialState, action) {
    switch (action.type) {
      case "DISPLAY_USER":
        return { ...state, users: action.payload };

        case "ACTIVATE_BUTTON":
          return { ...state, users:state.users.map(e => (e._id == action.payload) && {...state.users,activate:!state.activate}  )   };


      default:return state
    }
}
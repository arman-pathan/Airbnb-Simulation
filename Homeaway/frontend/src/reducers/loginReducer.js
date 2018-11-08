// import {
//   FETCH_LOGIN,
//   FETCH_OWNER_LOGIN,
//   SIGN_UP,
//   OWNER_SIGN_UP
// } from "../actions";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_LOGIN":
      return {
        ...state,
        data: action.payload
      };

    case "FETCH_OWNER_LOGIN":
      return {
        ...state,
        data: action.payload
      };

    case "SIGN_UP":
      return {
        ...state,
        data: action.payload
      };

    case "OWNER_SIGN_UP":
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
}

// export default function(state = {}, action) {
//   switch (action.type) {
//     case FETCH_LOGIN:
//       return action.payload;

//     default:
//       return state;
//   }
// }

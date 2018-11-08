// import {
//   FETCH_LOGIN,
//   FETCH_OWNER_LOGIN,
//   SIGN_UP,
//   OWNER_SIGN_UP
// } from "../actions";

const initialState = {
  authFlag: false,
  updated: false,
  sent: false,
  searched: false,
  booked: false,
  listed: false,
  data: [],
  properties: []
};

console.log("Inside main reducer");
const mainreducer = (state = initialState, action) => {
  if (action.type === "FETCH_LOGIN") {
    console.log("Inside FETCH_LOGIN reducer");
    return {
      ...state,
      data: state.data.concat(action.payload)
    };
  }

  if (action.type === "FETCH_OWNER_LOGIN" && action.statusCode == 200) {
    return {
      ...state,
      data: state.data.concat(action.payload)
    };
  }

  //   if (action.type === "LOGIN" && action.status == 400) {
  //     return {
  //       ...state,
  //       authFlag: action.payload.authFlag
  //     };
  //   }

  if (action.type === "SIGN_UP" && action.statusCode == 200) {
    return {
      ...state,
      data: state.data.concat(action.payload)
      //bookCreated: true
    };
  }

  //   if (action.type === "CREATE_BOOK" && action.statusCode == 400) {
  //     return {
  //       ...state,
  //       bookCreated: false
  //     };
  //   }

  if (action.type === "OWNER_SIGN_UP" && action.statusCode == 200) {
    return {
      ...state,
      data: state.data.concat(action.payload)
      //bookCreated: true
    };
  }

  if (action.type === "UPDATE_PROFILE" && action.statusCode == 200) {
    console.log("Inside update profile reducer");
    return {
      ...state,
      data: state.data.concat(action.payload.data),
      updated: true
    };
  }

  if (action.type === "SEND_MESSAGE" && action.statusCode == 200) {
    console.log("Inside send message reducer");
    return {
      ...state,
      data: state.data.concat(action.payload.data),
      sent: true
    };
  }

  if (action.type === "SEARCH_PROPERTY") {
    console.log("Inside search reducer");
    console.log(action.payload.result);
    return {
      ...state,

      properties: state.properties.concat(action.payload),
      searched: true
    };
  }

  if (action.type === "MODIFY_SEARCH_PROPERTY") {
    state.properties = [];
    console.log("Inside modify/filter search reducer");
    console.log(action.payload.result);
    return {
      ...state,

      properties: state.properties.concat(action.payload),
      searched: true
    };
  }

  if (action.type === "BOOK_PROPERTY") {
    console.log("Inside BOOK_PROPERTY reducer");
    console.log(action.payload);
    return {
      ...state,

      data: state.data.concat(action.payload),
      booked: true
    };
  }

  if (action.type === "OWNER_DASHBOARD") {
    state.properties = [];
    console.log("Inside OWNER_DASHBOARD reducer");
    console.log(action.payload.result);
    return {
      ...state,

      properties: state.properties.concat(action.payload)
    };
  }

  if (action.type === "TRAVELLER_DASHBOARD") {
    state.properties = [];
    console.log("Inside TRAVELLER_DASHBOARD reducer");
    console.log(action.payload.result);
    return {
      ...state,
      properties: state.properties.concat(action.payload)
    };
  }

  if (action.type === "LIST_PROPERTY") {
    console.log("Inside LIST_PROPERTY reducer");
    console.log(action.payload);
    return {
      ...state,

      data: state.data.concat(action.payload),
      listed: true
    };
  }
  return state;
};

export default mainreducer;

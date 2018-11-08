import axios from "axios";

// export const FETCH_LOGIN = "FETCH_LOGIN";
// export const FETCH_OWNER_LOGIN = "FETCH_OWNER_LOGIN";
// export const SIGN_UP = "SIGN_UP";
// export const OWNER_SIGN_UP = "OWNER_SIGN_UP";

const ROOT_URL = "http://18.223.168.84:5000";

export function fetchlogin(values, callback) {
  const response = axios
    .post(`${ROOT_URL}/login`, values)
    .then(res => callback(res));

  return {
    type: "FETCH_LOGIN",
    payload: response.data,
    statusCode: response.status
  };
}

export function fetchownerlogin(values, callback) {
  const response = axios
    .post(`${ROOT_URL}/ownerlogin`, values)
    .then(res => callback(res));

  return {
    type: "FETCH_OWNER_LOGIN",
    payload: response.data,
    statusCode: response.status
  };
}

export function signup(values, callback) {
  const response = axios
    .post(`${ROOT_URL}/signup`, values)
    .then(() => callback());

  return {
    type: "SIGN_UP",
    payload: response.data,
    statusCode: response.status
  };
}

export function ownersignup(values, callback) {
  const response = axios
    .post(`${ROOT_URL}/ownersignup`, values)
    .then(() => callback());

  return {
    type: "OWNER_SIGN_UP",
    payload: response.data,
    statusCode: response.status
  };
}

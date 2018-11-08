import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer from "./loginReducer";
import mainreducer from "./mainreducer";
const rootReducer = combineReducers({
  // login: loginReducer,
  reducer: mainreducer,
  form: formReducer
});

export default rootReducer;

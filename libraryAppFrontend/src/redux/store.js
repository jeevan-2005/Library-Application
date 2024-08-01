import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { loginReducer } from "./login/loginReducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
  login: loginReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

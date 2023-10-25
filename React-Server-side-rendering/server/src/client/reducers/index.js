import { combineReducers } from "redux";
import usersReducer from "./usersReducer.js";
export default combineReducers({ users: usersReducer });

import { combineReducers } from "redux";
import user from "./user/reducer";
import todos from "./todos/reducer";
import notifications from "./notifications/reducer";

export default combineReducers({
  user,
  todos,
  notifications,
});

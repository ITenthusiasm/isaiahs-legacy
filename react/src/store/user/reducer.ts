import { UserAction, UserTypes, UserState } from "./types";
import { GlobalActionTypes } from "../types";
import initialState from "../initialState";

/** The User Reducer */
function user(state = initialState.user, action: UserAction): UserState {
  switch (action.type) {
    case UserTypes.ADD_USER_SUCCESS:
      return action.user;
    case UserTypes.GET_USER_SUCCESS:
      return action.user;
    case GlobalActionTypes.LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
export default user;

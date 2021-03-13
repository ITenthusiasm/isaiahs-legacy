import { addNotification } from "../notifications/actions";
import { UserService } from "../../services";
import history from "../../router/history";
import { UserInfo } from "../../types";
import { Thunk } from "../types";
import { UserAction, UserTypes, UserState } from "./types";

// Action Creators
function addUserSuccess(user: UserState): UserAction {
  return { type: UserTypes.ADD_USER_SUCCESS, user };
}

function addUserFailure(): UserAction {
  return { type: UserTypes.ADD_USER_FAILURE };
}

function getUserSuccess(user: UserState): UserAction {
  return { type: UserTypes.GET_USER_SUCCESS, user };
}

function getUserFailure(): UserAction {
  return { type: UserTypes.GET_USER_FAILURE };
}

// Thunks
export function addUser(userInfo: UserInfo): Thunk {
  return async function (dispatch) {
    try {
      if (await UserService.userExists(userInfo.username)) {
        dispatch(addNotification("Username already exists."));
        return;
      }

      const user = await UserService.postUser(userInfo);
      dispatch(addUserSuccess(user));
      history.push("/todos");
    } catch (err) {
      dispatch(addUserFailure());
      console.error(err);
    }
  };
}

export function getUser(userInfo: UserInfo): Thunk {
  return async function (dispatch) {
    try {
      const user = await UserService.getUser(userInfo);
      if (!user) {
        dispatch(addNotification("Invalid username or password."));
        return;
      }

      dispatch(getUserSuccess(user));
      history.push("/todos");
    } catch (err) {
      dispatch(getUserFailure());
      console.error(err);
    }
  };
}

import { GlobalAction } from "../types";

/** Structure of the state in the User Reducer */
export type UserState = { id: string; name: string } | null;

/** Possible action types for the User Reducer */
export enum UserTypes {
  ADD_USER_SUCCESS = "ADD_USER_SUCCESS",
  ADD_USER_FAILURE = "ADD_USER_FAILURE",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_FAILURE = "GET_USER_FAILURE",
}

interface AddUserSuccessAction {
  type: UserTypes.ADD_USER_SUCCESS;
  user: UserState;
}

interface AddUserFailureAction {
  type: UserTypes.ADD_USER_FAILURE;
}

interface GetUserSuccessAction {
  type: UserTypes.GET_USER_SUCCESS;
  user: UserState;
}

interface GetUserFailureAction {
  type: UserTypes.GET_USER_FAILURE;
}

/** A general User Action for the User Reducer */
export type UserAction =
  | AddUserSuccessAction
  | AddUserFailureAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | GlobalAction;

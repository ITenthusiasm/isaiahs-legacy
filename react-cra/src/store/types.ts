import { Action, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { UserState } from "./user/types";
import { TodosState } from "./todos/types";

/** The root state of the redux application */
export interface RootState {
  user: UserState;
  todos: TodosState;
}

/** A thunk used for redux-thunk */
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/** Extensions for the dispatch type. Used specifically for testing thunks. */
export type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

/* FOR "GLOBAL ACTIONS" */
export enum GlobalActionTypes {
  LOGOUT_USER = "LOGOUT_USER",
}

interface LogoutUserAction {
  type: GlobalActionTypes.LOGOUT_USER;
}

export type GlobalAction = LogoutUserAction;

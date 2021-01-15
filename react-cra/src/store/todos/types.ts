import { TodoDetails } from "../../types";

/** Structure of the state in the Todos Reducer */
export type TodosState = Omit<TodoDetails, "userId">[];

/** Possible action types for the Todos Reducer */
export enum TodosTypes {
  ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS",
  ADD_TODO_FAILURE = "ADD_TODO_FAILURE",
  REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS",
  REMOVE_TODO_FAILURE = "REMOVE_TODO_FAILURE",
  GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS",
  GET_TODOS_FAILURE = "GET_TODOS_FAILURE",
}

interface AddTodoSuccessAction {
  type: TodosTypes.ADD_TODO_SUCCESS;
  todo: Omit<TodoDetails, "userId">;
}

interface AddTodoFailureAction {
  type: TodosTypes.ADD_TODO_FAILURE;
}

interface RemoveTodoSuccessAction {
  type: TodosTypes.REMOVE_TODO_SUCCESS;
  todoId: number;
}

interface RemoveTodoFailureAction {
  type: TodosTypes.REMOVE_TODO_FAILURE;
}

interface GetTodosSuccessAction {
  type: TodosTypes.GET_TODOS_SUCCESS;
  todos: TodosState;
}

interface GetTodosFailureAction {
  type: TodosTypes.GET_TODOS_FAILURE;
}

/** A general Todos Action for the Todos Reducer */
export type TodosAction =
  | AddTodoSuccessAction
  | AddTodoFailureAction
  | RemoveTodoSuccessAction
  | RemoveTodoFailureAction
  | GetTodosSuccessAction
  | GetTodosFailureAction;

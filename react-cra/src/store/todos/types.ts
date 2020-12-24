/** Structure of the state in the Todos Reducer */
export type TodosState = string[];

/** Possible action types for the Todos Reducer */
export enum TodosTypes {
  ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS",
  ADD_TODO_FAILURE = "ADD_TODO_FAILURE",
  GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS",
  GET_TODOS_FAILURE = "GET_TODOS_FAILURE",
}

interface AddTodoSuccessAction {
  type: TodosTypes.ADD_TODO_SUCCESS;
  text: string;
}

interface AddTodoFailureAction {
  type: TodosTypes.ADD_TODO_FAILURE;
}

interface GetTodosSuccessAction {
  type: TodosTypes.GET_TODOS_SUCCESS;
  todos: string[];
}

interface GetTodosFailureAction {
  type: TodosTypes.GET_TODOS_FAILURE;
}

/** A general Todos Action for the Todos Reducer */
export type TodosAction =
  | AddTodoSuccessAction
  | AddTodoFailureAction
  | GetTodosSuccessAction
  | GetTodosFailureAction;

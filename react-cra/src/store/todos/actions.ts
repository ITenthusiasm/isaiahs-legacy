import { TodosService } from "../../services";
import { TodoDetails } from "../../types";
import { Thunk } from "../types";
import { TodosTypes } from "./types";

// Action Creators
const addTodoSuccess = (text: string) => ({
  type: TodosTypes.ADD_TODO_SUCCESS,
  text,
});

const addTodoFailure = () => ({
  type: TodosTypes.ADD_TODO_FAILURE,
});

const getTodosSuccess = (todos: string[]) => ({
  type: TodosTypes.GET_TODOS_SUCCESS,
  todos,
});

const getTodosFailure = () => ({
  type: TodosTypes.GET_TODOS_FAILURE,
});

// Thunks
export function addTodo(todo: TodoDetails): Thunk {
  return async function (dispatch) {
    try {
      const todoText = await TodosService.postTodo(todo);
      dispatch(addTodoSuccess(todoText));
    } catch (err) {
      dispatch(addTodoFailure());
      console.error(err);
    }
  };
}

export function getTodos(userId: string): Thunk {
  return async function (dispatch) {
    try {
      const todos = await TodosService.getTodos(userId);
      dispatch(getTodosSuccess(todos));
    } catch (err) {
      dispatch(getTodosFailure());
      console.error(err);
    }
  };
}

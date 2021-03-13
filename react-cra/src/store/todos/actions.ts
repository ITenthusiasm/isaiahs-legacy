import { TodosService } from "../../services";
import { TodoDetails } from "../../types";
import { Thunk } from "../types";
import { TodosAction, TodosTypes, TodosState } from "./types";

// Action Creators
function addTodoSuccess(todo: Omit<TodoDetails, "userId">): TodosAction {
  return { type: TodosTypes.ADD_TODO_SUCCESS, todo };
}

function addTodoFailure(): TodosAction {
  return { type: TodosTypes.ADD_TODO_FAILURE };
}

function removeTodoSuccess(todoId: number): TodosAction {
  return { type: TodosTypes.REMOVE_TODO_SUCCESS, todoId };
}

function removeTodoFailure(): TodosAction {
  return { type: TodosTypes.REMOVE_TODO_FAILURE };
}

function getTodosSuccess(todos: TodosState): TodosAction {
  return { type: TodosTypes.GET_TODOS_SUCCESS, todos };
}

function getTodosFailure(): TodosAction {
  return { type: TodosTypes.GET_TODOS_FAILURE };
}

// Thunks
export function addTodo(todo: Omit<TodoDetails, "id">): Thunk {
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

export function removeTodo(todoId: number): Thunk {
  return async function (dispatch) {
    try {
      await TodosService.deleteTodo(todoId);
      dispatch(removeTodoSuccess(todoId));
    } catch (err) {
      dispatch(removeTodoFailure());
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

import { TodosService } from "../../services";
import { TodoDetails } from "../../types";
import { Thunk } from "../types";
import { TodosTypes, TodosState } from "./types";

// Action Creators
const addTodoSuccess = (todo: Omit<TodoDetails, "userId">) => ({
  type: TodosTypes.ADD_TODO_SUCCESS,
  todo,
});

const addTodoFailure = () => ({
  type: TodosTypes.ADD_TODO_FAILURE,
});

const removeTodoSuccess = (todoId: number) => ({
  type: TodosTypes.REMOVE_TODO_SUCCESS,
  todoId,
});

const removeTodoFailure = () => ({
  type: TodosTypes.REMOVE_TODO_FAILURE,
});

const getTodosSuccess = (todos: TodosState) => ({
  type: TodosTypes.GET_TODOS_SUCCESS,
  todos,
});

const getTodosFailure = () => ({
  type: TodosTypes.GET_TODOS_FAILURE,
});

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

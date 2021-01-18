import { TodosAction, TodosTypes, TodosState } from "./types";
import { GlobalActionTypes } from "../types";
import initialState from "../initialState";

/** The Todos Reducer */
function todos(state = initialState.todos, action: TodosAction): TodosState {
  switch (action.type) {
    case TodosTypes.ADD_TODO_SUCCESS:
      return [...state, action.todo];
    case TodosTypes.REMOVE_TODO_SUCCESS:
      return state.filter((todo) => todo.id !== action.todoId);
    case TodosTypes.GET_TODOS_SUCCESS:
      return action.todos;
    case GlobalActionTypes.LOGOUT_USER:
      return [];
    default:
      return state;
  }
}

export default todos;

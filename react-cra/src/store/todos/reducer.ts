import { TodosAction, TodosTypes, TodosState } from "./types";
import initialState from "../initialState";

/** The Todos Reducer */
function todos(state = initialState.todos, action: TodosAction): TodosState {
  switch (action.type) {
    case TodosTypes.ADD_TODO_SUCCESS:
      return [...state, action.text];
    case TodosTypes.GET_TODOS_SUCCESS:
      return action.todos;
    default:
      return state;
  }
}

export default todos;

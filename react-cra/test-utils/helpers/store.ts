import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../src/store/rootReducer";
import { RootState } from "../../src/store/types";

const middleware = [thunk];

/**
 * Initializes a redux-store with the specified initial state.
 * @param initialState
 */
export function initializeStore(initialState: Partial<RootState>) {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

import { createBrowserHistory } from "history";

/** History object used for the entire application's routing */
const history = createBrowserHistory();

// This should be supplied to the Router component directly.
// Only import the history if necessary, like with store side effects.
// Components should not have to import the history object directly. Try the `useHistory` hook instead.
export default history;

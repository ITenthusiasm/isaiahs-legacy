import { NotificationsAction, NotificationsTypes, NotificationsState } from "./types";
import initialState from "../initialState";

let nextId = 1;

/** The Notifications Reducer */
function notifications(state = initialState.notifications, action: NotificationsAction): NotificationsState {
  switch (action.type) {
    case NotificationsTypes.ADD_NOTIFICATION:
      return [...state, { id: nextId++, message: action.message }];
    case NotificationsTypes.REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== action.id);
    default:
      return state;
  }
}

export default notifications;

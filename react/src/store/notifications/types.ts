/** Structure of the state in the Notifications Reducer */
export type NotificationsState = { id: number; message: string }[];

/** Possible action types for the Notifications Reducer */
export enum NotificationsTypes {
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
}

interface AddNotificationAction {
  type: NotificationsTypes.ADD_NOTIFICATION;
  message: string;
}

interface RemoveNotificationAction {
  type: NotificationsTypes.REMOVE_NOTIFICATION;
  id: number;
}

/** A general Notifications Action for the Notifications Reducer */
export type NotificationsAction = AddNotificationAction | RemoveNotificationAction;

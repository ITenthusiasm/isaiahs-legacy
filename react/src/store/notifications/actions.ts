import { NotificationsAction, NotificationsTypes } from "./types";

export function addNotification(message: string): NotificationsAction {
  return { type: NotificationsTypes.ADD_NOTIFICATION, message };
}

export function removeNotification(id: number): NotificationsAction {
  return { type: NotificationsTypes.REMOVE_NOTIFICATION, id };
}

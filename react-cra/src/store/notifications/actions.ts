import { NotificationsTypes } from "./types";

export const addNotification = (message: string) => ({
  type: NotificationsTypes.ADD_NOTIFICATION,
  message,
});

export const removeNotification = (id: number) => ({
  type: NotificationsTypes.REMOVE_NOTIFICATION,
  id,
});

import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import type { RootState } from "../store/types";

function NotificationsContainer() {
  const notifications = useSelector(mapStoreState);

  return (
    <ul style={styles.notificationsContainer}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </ul>
  );
}

function mapStoreState(state: RootState) {
  return state.notifications;
}

type NotificationsContainerStyles = "notificationsContainer";

const styles: Record<NotificationsContainerStyles, React.CSSProperties> = {
  notificationsContainer: {
    position: "fixed",
    right: "0",
    bottom: "0",
    left: "0",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: "0",
    margin: "0",
    listStyle: "none",
  },
};

export default NotificationsContainer;

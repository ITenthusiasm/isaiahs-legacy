import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { RootState } from "../store/types";

function NotificationsContainer() {
  const notifications = useSelector(mapStoreState);

  return (
    <div style={styles.notificationsContainer}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
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
  },
};

export default NotificationsContainer;

import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../store/notifications/actions";

interface NotificationProps {
  id: number;
  message: string;
}

function Notification({ id, message }: NotificationProps) {
  const dispatch = useDispatch();

  const timerRef = useRef<number>();

  useEffect(() => {
    timerRef.current = window.setTimeout(
      () => dispatch(removeNotification(id)),
      5000
    );

    return () => clearTimeout(timerRef.current);
  });

  return <div style={styles.message}>{message}</div>;
}

type NotificationStyles = "message";

const styles: Record<NotificationStyles, React.CSSProperties> = {
  message: {
    padding: "1rem",
    width: "20rem",

    fontSize: "1rem",
    textAlign: "center",
  },
};

export default Notification;

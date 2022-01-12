import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo } from "../store/todos/actions";

interface TodoProps {
  id: number;
  text: string;
}

function Todo({ id, text }: TodoProps) {
  const dispatch = useDispatch();

  return (
    <li style={styles.container}>
      <div style={styles.text}>{text}</div>

      <button type="button" style={styles.icon} onClick={() => dispatch(removeTodo(id))}>
        &#215;
      </button>
    </li>
  );
}

type TodoStyles = "container" | "text" | "icon";

const styles: Record<TodoStyles, React.CSSProperties> = {
  container: {
    padding: "0.5rem",
    border: "1px solid black",
    borderRadius: "5px",
    margin: "0.5rem 0",
    width: "14rem",
    textAlign: "left",

    display: "flex",
    alignItems: "center",
  },
  text: {
    flex: 1,
  },
  icon: {
    padding: "0",
    border: "none",

    fontSize: "2rem",
    color: "red",
    background: "none",
    cursor: "pointer",
  },
};

export default Todo;

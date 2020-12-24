import React from "react";

interface TodoProps {
  text: string;
}

function Todo({ text }: TodoProps) {
  return <div style={styles.container}>{text}</div>
}

type TodoStyles = "container";

const styles: Record<TodoStyles, React.CSSProperties> = {
  container: {
    padding: "0.5rem",
    border: "1px solid black",
    borderRadius: "5px",
    margin: "0.5rem",
    width: "14rem",
    textAlign: "left"
  }
}

export default Todo;
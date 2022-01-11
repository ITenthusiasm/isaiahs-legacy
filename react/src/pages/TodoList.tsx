import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Todo } from "../components";
import { addTodo, getTodos } from "../store/todos/actions";
import { RootState } from "../store/types";

function TodoList() {
  const { user, todos } = useSelector(mapStoreState);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (user) dispatch(getTodos(user.id));
  }, [user, dispatch]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTodo(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const todo = { userId: user.id, text: newTodo.trim() };

    if (todo.text) dispatch(addTodo(todo));
    setNewTodo("");
  }

  if (!user) {
    console.log("You arrived at this page before a user was loaded! 😔"); // eslint-disable-line no-console
    return <div style={styles.info}>Login to see your todos!</div>;
  }

  return (
    <div style={styles.container}>
      <h1>{user.name}&apos;s Todos</h1>

      <form onSubmit={handleSubmit}>
        <label style={styles.labels} htmlFor="addTodo">
          Add Todo
        </label>
        <input id="addTodo" value={newTodo} onChange={handleChange} />

        <button type="submit" style={styles.button}>
          add
        </button>
      </form>

      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
}

function mapStoreState(state: RootState) {
  return {
    user: state.user as NonNullable<RootState["user"]>,
    todos: state.todos,
  };
}

type TodoListStyles = "container" | "labels" | "info" | "button";

const styles: Record<TodoListStyles, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  labels: {
    display: "block",
    marginTop: "0.5rem",
  },
  info: {
    fontSize: "1.25rem",
    textAlign: "center",
    margin: "0.5rem",
  },
  button: {
    marginLeft: "2rem",
  },
};

export default TodoList;

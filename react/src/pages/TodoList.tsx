import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Todo } from "../components";
import { addTodo, getTodos } from "../store/todos/actions";
import type { RootState } from "../store/types";

function TodoList() {
  const { user, todos } = useSelector(mapStoreState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getTodos(user.id));
  }, [user, dispatch]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const todoInput = form.elements.namedItem("addTodo") as HTMLInputElement;
    const todo = { userId: user.id, text: todoInput.value.trim() };

    if (todo.text) dispatch(addTodo(todo));
    form.reset();
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
        <input id="addTodo" />

        <button type="submit" style={styles.button}>
          add
        </button>
      </form>

      <ul style={styles.todoList}>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

function mapStoreState(state: RootState) {
  return {
    user: state.user as NonNullable<RootState["user"]>,
    todos: state.todos,
  };
}

type TodoListStyles = "container" | "labels" | "info" | "button" | "todoList";

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
  todoList: {
    padding: "0",
    margin: "0",
    listStyle: "none",
  },
};

export default TodoList;

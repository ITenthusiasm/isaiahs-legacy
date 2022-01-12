import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addUser, getUser } from "../store/user/actions";
import { logoutUser } from "../store/globalActions";
import type { RootState } from "../store/types";

function Home() {
  const user = useSelector(mapStoreState);
  const dispatch = useDispatch();

  async function login(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault(); // Prevent page reload on form submissions
    const form = event.currentTarget.form as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    if (!username || !password) return;

    const action = event.currentTarget.name;
    const userInfo = { username, password };

    if (action === "sign-up") await dispatch(addUser(userInfo));
    if (action === "sign-in") await dispatch(getUser(userInfo));
  }

  const logout = useCallback(() => dispatch(logoutUser()), []);

  if (user) {
    return (
      <div style={styles.container}>
        <h1>Home</h1>

        <div style={styles.info}>
          Welcome! Click
          <NavLink style={styles.links} to="/todos">
            here
          </NavLink>
          to see your todos
        </div>

        <div style={styles.info}>
          Not you?
          <NavLink to="/" style={styles.links} onClick={logout}>
            Logout
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Login</h1>

      <form>
        <div>
          <label style={styles.labels} htmlFor="username">
            Username
          </label>
          <input id="username" />
        </div>

        <div>
          <label style={styles.labels} htmlFor="password">
            Password
          </label>
          <input id="password" />
        </div>

        <div style={styles.actions}>
          <button name="sign-up" type="button" onClick={login}>
            sign up
          </button>

          <button name="sign-in" type="submit" onClick={login}>
            sign in
          </button>
        </div>
      </form>
    </div>
  );
}

function mapStoreState(store: RootState) {
  return store.user;
}

type HomeStyles = "container" | "labels" | "links" | "info" | "actions";

const styles: Record<HomeStyles, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  labels: {
    display: "block",
    marginTop: "0.5rem",
  },
  links: {
    color: "blue",
    textDecoration: "none",
    margin: "0rem 0.25rem",
    cursor: "pointer",
  },
  info: {
    fontSize: "1.25rem",
    margin: "0.5rem",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
};

export default Home;

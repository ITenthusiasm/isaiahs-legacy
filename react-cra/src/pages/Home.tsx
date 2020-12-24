import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { addUser, getUser } from "../store/user/actions";
import { UserInfo } from "../types";

function Home({ history }: RouteComponentProps) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function login(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!username || !password) return;

    const userInfo: UserInfo = { username, password };
    const action = event.currentTarget.name;

    if (action === "sign-up") await dispatch(addUser(userInfo));
    if (action === "sign-in") await dispatch(getUser(userInfo));
    history.push("/todos");
  }

  return (
    <div style={styles.container}>
      <h2>login</h2>

      <div>
        <div>
          <label style={styles.labels} htmlFor="username">
            Username
          </label>
          <input id="username" value={username} onChange={updateUsername} />
        </div>

        <div>
          <label style={styles.labels} htmlFor="password">
            Password
          </label>
          <input id="password" value={password} onChange={updatePassword} />
        </div>

        <div style={styles.actions}>
          <button name="sign-up" type="button" onClick={login}>
            sign up
          </button>
          <button name="sign-in" type="button" onClick={login}>
            sign in
          </button>
        </div>
      </div>
    </div>
  );
}

type HomeStyles = "container" | "labels" | "actions";

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
  actions: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
};

export default Home;

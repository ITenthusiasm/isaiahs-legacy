import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Home, TodoList } from "./pages";
import { NotificationsContainer } from "./components";

function App() {
  return (
    <>
      <nav style={styles.nav}>
        <Link style={styles.links} to="/">
          Home
        </Link>
        |
        <Link style={styles.links} to="/todos">
          Todos
        </Link>
      </nav>

      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/todos" component={TodoList} />
        </Switch>

        <NotificationsContainer />
      </main>
    </>
  );
}

type AppStyles = "nav" | "links";

const styles: Record<AppStyles, React.CSSProperties> = {
  nav: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  links: {
    color: "blue",
    textDecoration: "none",
    margin: "0rem 0.25rem",
  },
};

export default App;

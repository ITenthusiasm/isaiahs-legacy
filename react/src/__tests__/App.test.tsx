import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { initializeStore } from "../../test-utils/helpers";
import store from "../store";
import history from "../router/history";
import App from "../App";

describe("App", () => {
  /* Helper Functions */
  function renderComponentWithStore(customStore = store) {
    return render(
      <Provider store={customStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  }

  it("Displays the correct navigation links", () => {
    const { getByText } = renderComponentWithStore();

    const homeLink = getByText(/home/i);
    expect(homeLink).toHaveAttribute("href", "/");

    const todosLink = getByText(/todos/i);
    expect(todosLink).toHaveAttribute("href", "/todos");
  });

  it("Displays notifications in the store", () => {
    const message = "This is a notification";
    const notifications = [{ id: 1, message: "This is a notification" }];

    const localStore = initializeStore({
      user: null,
      todos: [],
      notifications,
    });

    const { getByText } = renderComponentWithStore(localStore);

    const notification = getByText(message);
    expect(notification).toBeInTheDocument();
  });
});

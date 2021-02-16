import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initializeStore } from "../../../test-utils/helpers";
import { NotificationsContainer } from "../../components";
import history from "../../router/history";
import { UserService } from "../../services";
import { Home } from "..";

describe("Home", () => {
  const fakeUser = { id: "FAKE_ID", name: "FAKE_NAME" };
  const defaultState = { user: null, notifications: [] };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  /* Helper Functions */
  function renderComponentWithStore(store: ReturnType<typeof initializeStore>) {
    return render(
      <Provider store={store}>
        <Router history={history}>
          <Home />
          <NotificationsContainer />
        </Router>
      </Provider>
    );
  }

  /* Tests */
  // ---------- User Present ---------- //
  it("Displays the 'Home' as the title when a user is present", () => {
    const store = initializeStore({ ...defaultState, user: fakeUser });
    const { getByText } = renderComponentWithStore(store);

    expect(getByText(/home/i)).toBeInTheDocument();
  });

  it("Shows a link to the Todos page when a user is present", () => {
    const store = initializeStore({ ...defaultState, user: fakeUser });
    const { getByText } = renderComponentWithStore(store);

    const link = getByText(/here/i);
    expect(link).toHaveAttribute("href", "/todos");
  });

  it("Shows an action that logs out an active user", async () => {
    const store = initializeStore({ ...defaultState, user: fakeUser });
    const { queryByText } = renderComponentWithStore(store);

    const action = queryByText(/logout/i) as HTMLElement;
    userEvent.click(action);

    // The logout action should no longer be present because the user is logged out
    expect(action).not.toBeInTheDocument();
  });

  // ---------- User Not Present ---------- //
  it("Shows a login page if no user is present", () => {
    const store = initializeStore(defaultState);
    const { getByText } = renderComponentWithStore(store);

    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it("Does not sign up or sign in if the username or password is missing", () => {
    const fakePassword = "FAKE_PASSWORD";
    const getUser = jest.spyOn(UserService, "getUser");
    const postUser = jest.spyOn(UserService, "postUser");

    const store = initializeStore(defaultState);
    const { getByText, getByLabelText } = renderComponentWithStore(store);

    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const signUp = getByText(/sign up/i);
    const signIn = getByText(/sign in/i);

    // Attempt with empty credentials
    userEvent.click(signIn);
    expect(getUser).not.toHaveBeenCalled();

    userEvent.click(signUp);
    expect(postUser).not.toHaveBeenCalled();

    // Attempt with only username
    userEvent.type(username, fakeUser.name);

    userEvent.click(signIn);
    expect(getUser).not.toHaveBeenCalled();

    userEvent.click(signUp);
    expect(postUser).not.toHaveBeenCalled();

    // Attempt with only password
    userEvent.clear(username);
    userEvent.type(password, fakePassword);

    userEvent.click(signIn);
    expect(getUser).not.toHaveBeenCalled();

    userEvent.click(signUp);
    expect(postUser).not.toHaveBeenCalled();
  });

  it("Navigates the user to the Todos page after successful sign-up", async () => {
    const fakePassword = "FAKE_PASSWORD";
    jest.spyOn(UserService, "userExists").mockResolvedValue(false);
    const mockPostUser = jest
      .spyOn(UserService, "postUser")
      .mockResolvedValue(fakeUser);

    const store = initializeStore(defaultState);
    const { getByText, getByLabelText } = renderComponentWithStore(store);

    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const signUp = getByText(/sign up/i);

    userEvent.type(username, fakeUser.name);
    userEvent.type(password, fakePassword);
    userEvent.click(signUp);

    await waitFor(() =>
      expect(mockPostUser).toHaveBeenCalledWith({
        username: fakeUser.name,
        password: fakePassword,
      })
    );

    expect(window.location.href).toBe("http://localhost/todos");
  });

  it("Displays an error message during sign-up if the username is taken", async () => {
    const errorText = "Username already exists.";
    const fakePassword = "FAKE_PASSWORD";
    jest.spyOn(UserService, "userExists").mockResolvedValue(true);

    const store = initializeStore(defaultState);
    const { getByText, getByLabelText, findByText } = renderComponentWithStore(
      store
    );

    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const signUp = getByText(/sign up/i);

    userEvent.type(username, fakeUser.name);
    userEvent.type(password, fakePassword);
    userEvent.click(signUp);

    const errorNotification = await findByText(errorText);
    expect(errorNotification).toBeInTheDocument();
  });

  it("Navigates to the Todos page after a successful sign-in", async () => {
    const fakePassword = "FAKE_PASSWORD";
    const mockGetUser = jest
      .spyOn(UserService, "getUser")
      .mockResolvedValue(fakeUser);

    const store = initializeStore(defaultState);
    const { getByText, getByLabelText } = renderComponentWithStore(store);

    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const signIn = getByText(/sign in/i);

    userEvent.type(username, fakeUser.name);
    userEvent.type(password, fakePassword);
    userEvent.click(signIn);

    await waitFor(() =>
      expect(mockGetUser).toHaveBeenCalledWith({
        username: fakeUser.name,
        password: fakePassword,
      })
    );

    expect(window.location.href).toBe("http://localhost/todos");
  });

  it("Displays an error message during sign-in if the credentials are invalid", async () => {
    const errorText = "Invalid username or password.";
    const fakePassword = "FAKE_PASSWORD";
    jest.spyOn(UserService, "getUser").mockResolvedValue(undefined);

    const store = initializeStore(defaultState);
    const { getByText, getByLabelText, findByText } = renderComponentWithStore(
      store
    );

    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const signIn = getByText(/sign in/i);

    userEvent.type(username, fakeUser.name);
    userEvent.type(password, fakePassword);
    userEvent.click(signIn);

    const errorNotification = await findByText(errorText);
    expect(errorNotification).toBeInTheDocument();
  });
});

import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initializeStore } from "../../../test-utils/helpers";
import { TodosService } from "../../services";
import { TodoList } from "..";

describe("Todo List", () => {
  const fakeUser = { id: "FAKE_ID", name: "FAKE_NAME" };
  const defaultState = { user: fakeUser, todos: [] };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  /* Helper Functions */
  function renderComponentWithStore(store: ReturnType<typeof initializeStore>) {
    return render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }

  /* Tests */
  it("Displays a login message when no user is present", () => {
    const loginMessage = "Login to see your todos!";

    const store = initializeStore({ ...defaultState, user: null });
    const { getByText } = renderComponentWithStore(store);

    expect(getByText(loginMessage)).toBeInTheDocument();
  });

  it("Displays the name of the logged in user", () => {
    jest.spyOn(TodosService, "getTodos").mockResolvedValue([]);

    const store = initializeStore(defaultState);
    const { getByText } = renderComponentWithStore(store);

    expect(getByText(`${defaultState.user.name}'s Todos`)).toBeInTheDocument();
  });

  it("Displays the user's todos obtained from the database", async () => {
    const message1 = "Clean my room";
    const message2 = "Make plans for wife";

    const mockResponse = [
      { id: 1, text: message1 },
      { id: 2, text: message2 },
    ];

    jest.spyOn(TodosService, "getTodos").mockResolvedValue(mockResponse);

    const store = initializeStore(defaultState);
    const { getByText, findByText } = renderComponentWithStore(store);

    const todo1 = await findByText(message1);
    const todo2 = getByText(message2);

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });

  it("Does not allow the user to submit and empty todo", () => {
    const postTodo = jest.spyOn(TodosService, "postTodo");
    jest.spyOn(TodosService, "getTodos").mockResolvedValueOnce([]);

    const store = initializeStore(defaultState);
    const { getByText, getByLabelText } = renderComponentWithStore(store);

    const input = getByLabelText(/add todo/i);
    const button = getByText("add");

    // No text present
    userEvent.click(button);
    expect(postTodo).not.toHaveBeenCalled();

    // Empty string present
    userEvent.type(input, "\t   \t");
    userEvent.click(button);
    expect(postTodo).not.toHaveBeenCalled();
  });

  it("Adds the user's submitted todo to their list", async () => {
    const message = "Get groceries";
    const mockResponse = { id: 1, text: message };

    jest.spyOn(TodosService, "postTodo").mockResolvedValueOnce(mockResponse);
    jest.spyOn(TodosService, "getTodos").mockResolvedValueOnce([]);

    const store = initializeStore(defaultState);
    const {
      getByLabelText,
      queryByText,
      findByText,
    } = renderComponentWithStore(store);

    expect(queryByText(message)).not.toBeInTheDocument();

    const input = getByLabelText(/add todo/i);
    const button = queryByText("add") as HTMLElement;

    userEvent.type(input, message);
    userEvent.click(button);

    const newTodo = await findByText(message);
    expect(newTodo).toBeInTheDocument();
  });

  it("Clears the input whenever the submit button is clicked", () => {
    const message = "This is my todo";
    const mockResponse = { id: 1, text: message };
    jest.spyOn(TodosService, "postTodo").mockResolvedValue(mockResponse);
    jest.spyOn(TodosService, "getTodos").mockResolvedValueOnce([]);

    const store = initializeStore(defaultState);
    const { getByText, getByLabelText } = renderComponentWithStore(store);

    const input = getByLabelText(/add todo/i);
    const button = getByText("add");

    // Without valid text
    userEvent.type(input, "\t  \t");
    userEvent.click(button);
    expect(input).toHaveValue("");

    // With valid text
    userEvent.clear(input);
    userEvent.type(input, message);
    userEvent.click(button);
    expect(input).toHaveValue("");
  });

  it("Removes a todo when its delete icon is clicked", async () => {
    const todoToDelete = { id: 1, text: "Delete this" };

    jest.spyOn(TodosService, "getTodos").mockResolvedValue([todoToDelete]);
    jest.spyOn(TodosService, "deleteTodo").mockImplementation();

    const store = initializeStore(defaultState);
    const { queryByText, findByText } = renderComponentWithStore(store);

    const todo = await findByText(todoToDelete.text);
    expect(todo).toBeInTheDocument();

    const button = queryByText("×") as HTMLElement;
    userEvent.click(button);

    await waitFor(() =>
      expect(queryByText(todoToDelete.text)).not.toBeInTheDocument()
    );
  });
});

import todos from "../reducer";
import * as GlobalActions from "../../globalActions";

describe("Todos Reducer", () => {
  it("Empties the todos after a logout action", () => {
    const initialState = [
      { id: 1, text: "My first todo" },
      { id: 2, text: "My second todo" },
    ];

    const newState = todos(initialState, GlobalActions.logoutUser());
    expect(newState).toStrictEqual([]);
  });
});

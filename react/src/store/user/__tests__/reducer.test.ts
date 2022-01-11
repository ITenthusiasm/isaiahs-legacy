import user from "../reducer";
import * as GlobalActions from "../../globalActions";

describe("User Reducer", () => {
  it("Deletes the user after a logout action", () => {
    const initialState = { id: "FAKE_ID", name: "FAKE_NAME" };

    const newState = user(initialState, GlobalActions.logoutUser());
    expect(newState).toBeNull();
  });
});

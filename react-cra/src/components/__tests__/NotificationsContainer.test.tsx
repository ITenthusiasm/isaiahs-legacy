import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { initializeStore, wait } from "../../../test-utils/helpers";
import { NotificationsContainer } from "..";

// Increase the amount of time Jest can wait before timing out
// Note: We need at least 5000 ms.
jest.setTimeout(5100);

describe("Notifications Container", () => {
  /* Helper Functions */
  function renderComponentWithStore(store: ReturnType<typeof initializeStore>) {
    return render(
      <Provider store={store}>
        <NotificationsContainer />
      </Provider>
    );
  }

  /* Tests */
  it("Displays existing notifications and removes them in 5 seconds", async () => {
    const message1 = "I like candy";
    const message2 = "I hate cereal";

    const notifications = [
      { id: 1, message: message1 },
      { id: 2, message: message2 },
    ];

    const store = initializeStore({ notifications });
    const { getByText } = renderComponentWithStore(store);

    const notification1 = getByText(message1);
    const notification2 = getByText(message2);

    expect(notification1).toBeInTheDocument();
    expect(notification2).toBeInTheDocument();

    await wait(5000);
    expect(notification1).not.toBeInTheDocument();
    expect(notification2).not.toBeInTheDocument();
  });
});

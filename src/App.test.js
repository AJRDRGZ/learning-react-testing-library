import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { Search } from "./App";

describe("App", () => {
  test("renders App component async", async () => {
    render(<App />);

    // 1st render
    expect(screen.queryByText(/Signed in as/)).toBeNull();
    // screen.debug();

    // 2nd render when the promise resolves
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
    // screen.debug();
  });

  test("renders App component", async () => {
    render(<App />);

    // wait for the user to resolve needs only be used in our special case
    await screen.findByText(/Signed in as/);
    // screen.debug();
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    // screen.debug();
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});

describe("Search", () => {
  test("calls the onChange callback handler", async () => {
    const onChange = jest.fn();
    const text = "JavaScript";
    const wantCalled = text.length;

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    // userEvent triggers it for every key stroke: text.length (10)
    await userEvent.type(screen.getByRole("textbox"), text);

    expect(onChange).toHaveBeenCalledTimes(wantCalled);
  });
});

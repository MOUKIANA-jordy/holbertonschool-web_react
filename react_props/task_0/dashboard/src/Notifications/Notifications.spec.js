import React from "react";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import Notifications from "./Notifications";

// Mocks CSS & assets pour Jest
jest.mock("./assets/close-button.png", () => "close-icon.png");
jest.mock("./Notifications.css", () => ({}), { virtual: true });

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe("Notifications component (Task 7)", () => {
  test("renders the notifications title (case-insensitive)", () => {
    render(<Notifications />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test("contains a Close button inside the notifications container", () => {
    const { container } = render(<Notifications />);
    const panel = container.querySelector(".Notifications");
    expect(panel).toBeTruthy();
    const closeBtn = screen.getByRole("button", { name: /close/i });
    expect(within(panel).getByRole("button", { name: /close/i })).toBe(closeBtn);
  });

  test("renders exactly 3 list items as notifications", () => {
    render(<Notifications />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  // Test requis par seq1/seq3 : vérifie le log exact (case-insensitive)
  test("clicking the Close button logs the expected message", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<Notifications />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));
    spy.mockRestore();
  });
});

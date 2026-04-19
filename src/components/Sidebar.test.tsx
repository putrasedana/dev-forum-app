/**
 * test scenario for Sidebar component
 *
 * - Sidebar component
 *   - should render Threads and Leaderboards links
 *   - should render Login link when authUser is null
 *   - should render Logout button when authUser exists
 *   - should call signOut function when Logout button is clicked
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar.js";

describe("Sidebar component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Threads and Leaderboards links", () => {
    // arrange
    render(
      <MemoryRouter>
        <Sidebar authUser={null} signOut={() => {}} />
      </MemoryRouter>,
    );

    // assert
    expect(screen.getByText("Threads")).toBeInTheDocument();
    expect(screen.getByText("Leaderboards")).toBeInTheDocument();
  });

  it("should render Login link when authUser is null", () => {
    // arrange
    render(
      <MemoryRouter>
        <Sidebar authUser={null} signOut={() => {}} />
      </MemoryRouter>,
    );

    // assert
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("should render Logout button when authUser exists", () => {
    // arrange
    const authUser = {
      id: "user-1",
      name: "John",
      email: "john@test.com",
      avatar: "https://example.com/avatar.jpg",
    };

    render(
      <MemoryRouter>
        <Sidebar authUser={authUser} signOut={() => {}} />
      </MemoryRouter>,
    );

    // assert
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("should call signOut function when Logout button is clicked", async () => {
    // arrange
    const mockSignOut = vi.fn();
    const authUser = {
      id: "user-1",
      name: "John",
      email: "john@test.com",
      avatar: "https://example.com/avatar.jpg",
    };

    render(
      <MemoryRouter>
        <Sidebar authUser={authUser} signOut={mockSignOut} />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByRole("button", { name: "Logout" });

    // action
    await userEvent.click(logoutButton);

    // assert
    expect(mockSignOut).toHaveBeenCalled();
  });
});

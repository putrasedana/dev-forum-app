/**
 * test scenarios for LeaderBoardItem component
 *
 * - should render user name and score
 * - should display (You) when the leaderboard item belongs to the authenticated user
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LeaderBoardItem from "./LeaderBoardItem";

const fakeUser = {
  id: "user-1",
  name: "User One",
  avatar: "https://example.com/avatar.png",
};

const otherUser = {
  id: "user-2",
  name: "Other User",
  avatar: "https://example.com/avatar2.png",
};

describe("LeaderBoardItem component", () => {
  it("should render user name and score", () => {
    render(<LeaderBoardItem user={fakeUser} score={42} authUser={null} />);

    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.queryByText("(You)")).not.toBeInTheDocument();
  });

  it("should display (You) when the row belongs to the authenticated user", () => {
    render(<LeaderBoardItem user={fakeUser} score={99} authUser={fakeUser} />);

    expect(screen.getByText(/User One/i)).toBeInTheDocument();
    expect(screen.getByText("(You)")).toBeInTheDocument();
  });

  it("should not display (You) for other users", () => {
    render(<LeaderBoardItem user={otherUser} score={15} authUser={fakeUser} />);

    expect(screen.getByText("Other User")).toBeInTheDocument();
    expect(screen.queryByText("(You)")).not.toBeInTheDocument();
  });
});

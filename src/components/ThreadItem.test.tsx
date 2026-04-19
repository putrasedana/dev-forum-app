/**
 * test scenarios for ThreadItem component
 *
 * - should render thread details correctly
 * - should neutralize vote when user already upvoted
 * - should show error when unauthenticated user clicks vote
 * - should truncate long thread body
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const mockDispatch = vi.fn();
const mockUseAppDispatch = vi.fn(() => mockDispatch);
const mockUseAppSelector = vi.fn();

vi.mock("../states/hooks", () => ({
  useAppDispatch: () => mockUseAppDispatch(),
  useAppSelector: (selector: any) => mockUseAppSelector(selector),
}));

const mockAsyncUpVoteThread = vi.fn((id: string) => `up-${id}`);
const mockAsyncDownVoteThread = vi.fn((id: string) => `down-${id}`);
const mockAsyncNeutralizeThreadVote = vi.fn((id: string) => `neutral-${id}`);

vi.mock("../states/votes/action", () => ({
  asyncUpVoteThread: (id: string) => mockAsyncUpVoteThread(id),
  asyncDownVoteThread: (id: string) => mockAsyncDownVoteThread(id),
  asyncNeutralizeThreadVote: (id: string) => mockAsyncNeutralizeThreadVote(id),
}));

const mockShowError = vi.fn();
vi.mock("../utils/alert", () => ({
  showError: (message: string) => mockShowError(message),
}));

import ThreadItem from "./ThreadItem";

const fakeThread = {
  id: "thread-1",
  title: "Test Thread",
  body: "This is a testing thread body.",
  category: "general",
  createdAt: "2024-01-01T12:00:00Z",
  owner: { id: "owner-1", name: "Owner Name", avatar: "https://example.com/avatar.png" },
  upVotesBy: ["user-1"],
  downVotesBy: [],
  totalComments: 5,
};

const fakeAuthUser = { id: "user-1", name: "User One", avatar: "https://example.com/user.png" };

const renderThreadItem = () =>
  render(
    <MemoryRouter>
      <ThreadItem {...fakeThread} />
    </MemoryRouter>,
  );

describe("ThreadItem component", () => {
  beforeEach(() => {
    cleanup();
    mockDispatch.mockClear();
    mockUseAppDispatch.mockClear();
    mockUseAppSelector.mockClear();
    mockAsyncUpVoteThread.mockClear();
    mockAsyncDownVoteThread.mockClear();
    mockAsyncNeutralizeThreadVote.mockClear();
    mockShowError.mockClear();
  });

  it("should render thread title, category, comments and owner details", () => {
    mockUseAppSelector.mockImplementation((selector: any) => selector({ authUser: fakeAuthUser }));

    renderThreadItem();

    expect(screen.getByText("general")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Test Thread/i })).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Owner Name")).toBeInTheDocument();
  });

  it("should neutralize upvote when the authenticated user already upvoted", async () => {
    mockUseAppSelector.mockImplementation((selector: any) => selector({ authUser: fakeAuthUser }));

    renderThreadItem();

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);

    expect(mockDispatch).toHaveBeenCalledWith(`neutral-${fakeThread.id}`);
  });

  it("should show error when unauthenticated user clicks vote", async () => {
    mockUseAppSelector.mockImplementation((selector: any) => selector({ authUser: null }));

    renderThreadItem();

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockShowError).toHaveBeenCalledWith("You need to log in first to vote.");
  });

  it("should truncate long body content with ellipsis", () => {
    const longBody = "a".repeat(300);
    const longThread = { ...fakeThread, body: longBody };
    mockUseAppSelector.mockImplementation((selector: any) => selector({ authUser: fakeAuthUser }));

    render(
      <MemoryRouter>
        <ThreadItem {...longThread} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/\.\.\.$/)).toBeInTheDocument();
  });
});

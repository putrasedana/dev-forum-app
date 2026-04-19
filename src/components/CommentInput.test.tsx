/**
 * test scenarios for CommentInput component
 *
 * - should dispatch comment action when user is authenticated
 * - should clear textarea after successful submit
 * - should show error when unauthenticated user submits
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockDispatch = vi.fn();
const mockUseAppSelector = vi.fn();

vi.mock("../states/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => mockUseAppSelector(selector),
}));

const mockAsyncCreateComment = vi.fn((threadId: string, comment: string) => `create-${threadId}-${comment}`);
vi.mock("../states/threadDetail/action", () => ({
  asyncCreateComment: (threadId: string, comment: string) => mockAsyncCreateComment(threadId, comment),
}));

const mockShowError = vi.fn();
vi.mock("../utils/alert", () => ({
  showError: (message: string) => mockShowError(message),
}));

import CommentInput from "./CommentInput";

describe("CommentInput component", () => {
  beforeEach(() => {
    cleanup();
    mockDispatch.mockClear();
    mockUseAppSelector.mockClear();
    mockAsyncCreateComment.mockClear();
    mockShowError.mockClear();
  });

  it("should dispatch asyncCreateComment and clear textarea when authenticated", async () => {
    mockUseAppSelector.mockImplementation((selector: any) =>
      selector({ authUser: { id: "user-1", name: "User One", avatar: "https://example.com/avatar.png" } }),
    );

    render(<CommentInput threadId="thread-1" />);

    const textarea = screen.getByPlaceholderText("Write your comment...") as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /Post Comment/i });

    await userEvent.type(textarea, "This is a comment.");
    await userEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith("create-thread-1-This is a comment.");
    expect(textarea).toHaveValue("");
  });

  it("should show error and not dispatch when unauthenticated", async () => {
    mockUseAppSelector.mockImplementation((selector: any) => selector({ authUser: null }));

    render(<CommentInput threadId="thread-2" />);

    const textarea = screen.getByPlaceholderText("Write your comment...") as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /Post Comment/i });

    await userEvent.type(textarea, "Another comment.");
    await userEvent.click(submitButton);

    expect(mockShowError).toHaveBeenCalledWith("You need to log in first to submit a comment.");
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

/**
 * test scenario for VotesBtn component
 *
 * - VotesBtn component
 *   - should render icon and count
 *   - should call handleClick when button is clicked
 *   - should apply votedColor class when hasVoted is true
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import VotesBtn from "./VotesBtn.js";

// mock icon component
const MockIcon = () => <svg data-testid="mock-icon" />;

describe("VotesBtn component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render icon and count", () => {
    render(<VotesBtn handleClick={() => {}} count={10} hasVoted={false} icon={MockIcon} votedColor="text-blue-500" />);

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should call handleClick when button is clicked", () => {
    const handleClick = vi.fn();

    render(
      <VotesBtn handleClick={handleClick} count={5} hasVoted={false} icon={MockIcon} votedColor="text-blue-500" />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should apply votedColor class when hasVoted is true", () => {
    render(<VotesBtn handleClick={() => {}} count={3} hasVoted icon={MockIcon} votedColor="text-red-500" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-red-500");
  });
});

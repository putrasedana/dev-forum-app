/**
 * test scenario for LoginInput component
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call onLogin function with email and password when form is submitted
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginInput from "./LoginInput.js";

describe("LoginInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    // arrange
    render(<LoginInput onLogin={() => {}} />);
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;

    // action
    await userEvent.type(emailInput, "user@test.com");

    // assert
    expect(emailInput.value).toBe("user@test.com");
  });

  it("should handle password typing correctly", async () => {
    // arrange
    render(<LoginInput onLogin={() => {}} />);
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    // action
    await userEvent.type(passwordInput, "passwordtest");

    // assert
    expect(passwordInput.value).toBe("passwordtest");
  });

  it("should call onLogin function with email and password when form is submitted", async () => {
    // arrange
    const mockOnLogin = vi.fn();
    render(<LoginInput onLogin={mockOnLogin} />);

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const loginButton = screen.getByRole("button", { name: "Login" });

    await userEvent.type(emailInput, "user@test.com");
    await userEvent.type(passwordInput, "passwordtest");

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockOnLogin).toHaveBeenCalledWith({
      email: "user@test.com",
      password: "passwordtest",
    });
  });
});

import LoginInput from "../components/LoginInput.js";

export default {
  title: "Auth/LoginInput",
  component: LoginInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onLogin: { action: "onLogin" },
  },
};

export const Default = {};

export const Prefilled = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const email = canvasElement.querySelector<HTMLInputElement>("#email");
    const password = canvasElement.querySelector<HTMLInputElement>("#password");

    if (!email || !password) return;

    email.value = "test@example.com";
    email.dispatchEvent(new Event("input", { bubbles: true }));

    password.value = "password123";
    password.dispatchEvent(new Event("input", { bubbles: true }));
  },
};

export const Meta = {
  component: LoginInput,
  tags: ["autodocs"],
};

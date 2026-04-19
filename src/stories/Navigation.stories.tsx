import { MemoryRouter } from "react-router-dom";
import { useArgs } from "storybook/internal/preview-api";
import type { StoryContext } from "@storybook/react";
import Navigation from "../components/Sidebar.js";

interface NavigationArgs {
  authUser: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null;
}

export default {
  title: "Layout/Navigation",
  component: Navigation,
  decorators: [
    (Story: React.ComponentType, context: StoryContext) => (
      <MemoryRouter initialEntries={["/"]}>
        <div className="p-4 border rounded">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    signOut: { action: "signOut" },
  },
};

export const LoggedOut = {
  args: {
    authUser: null,
  },
};

export const LoggedIn = {
  args: {
    authUser: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://example.com/avatar.jpg",
    },
  },
};

export const LoggedInInteractive = {
  args: {
    authUser: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://example.com/avatar.jpg",
    },
  },
  render: (args: NavigationArgs) => {
    const [, updateArgs] = useArgs();

    const handleSignOut = () => {
      updateArgs({ authUser: null });
    };

    return <Navigation authUser={args.authUser} signOut={handleSignOut} />;
  },
};

export const Meta = {
  component: Navigation,
  tags: ["autodocs"],
};

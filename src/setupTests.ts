import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(() => Promise.resolve()),
  },
}));

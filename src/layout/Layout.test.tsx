import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Layout from "./Layout";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  };
});

vi.mock("../components/Header/Header", () => ({
  default: () => <div data-testid="header">Header Content</div>,
}));

describe("Layout", () => {
  const renderLayout = () => {
    return render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  };

  test("renders the layout structure", () => {
    renderLayout();

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  test("renders the container with padding and margin", () => {
    renderLayout();

    const container = screen.getByRole("main").closest("div");
    expect(container).toHaveClass("container px-6 py-4 mx-auto");
  });
});

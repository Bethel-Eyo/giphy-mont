import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchPage from "./SearchPage";
import * as useSearchPageLogic from "./useSearchPageLogic";
import { GiphyProvider } from "../../contexts/Giphy/GiphyProvider";
import { BrowserRouter } from "react-router-dom";

vi.mock("./useSearchPageLogic", async () => {
  const actual = await vi.importActual<typeof import("./useSearchPageLogic")>(
    "./useSearchPageLogic"
  );
  return {
    ...actual,
    default: vi.fn(), // Mock the default export
  };
});

describe("SearchPage", () => {
  beforeEach(() => {
    // Mock the return value for the `useSearchPageLogic` hook
    vi.spyOn(useSearchPageLogic, "default").mockReturnValue({
      searchResults: [],
      query: "funny",
      page: 1,
      setPage: vi.fn(),
      isLoading: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading skeletons when data is loading", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    // Check if skeletons are displayed
    const skeletons = screen.getAllByTestId("loading-skeleton");
    expect(skeletons).toHaveLength(10);
  });

  it("renders the query title", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    // Check if the query title is rendered
    const title = screen.getByText(/funny/i);
    expect(title).toBeInTheDocument();
  });

  it("displays message when no search results are found", async () => {
    // Mock the hook to return no results and a non-loading state
    vi.spyOn(useSearchPageLogic, "default").mockReturnValue({
      searchResults: [],
      query: "funny",
      page: 1,
      setPage: vi.fn(),
      isLoading: false,
    });

    render(
      <GiphyProvider>
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    // Check if the correct message is displayed
    expect(screen.getByText("Did not find gifs for funny")).toBeInTheDocument();
  });
});

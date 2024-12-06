import { IGif } from "@giphy/js-types";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import CategoryPage from "./CategoryPage";
import * as useCategoryPageLogic from "./useCategoryPageLogic";
import { GiphyProvider } from "../../contexts/Giphy/GiphyProvider";
import { BrowserRouter } from "react-router-dom";

// Mock the useCategoryPageLogic hook
vi.mock("./useCategoryPageLogic", async () => {
  const actual = await vi.importActual<typeof import("./useCategoryPageLogic")>(
    "./useCategoryPageLogic"
  );
  return {
    ...actual,
    default: vi.fn(), // Mock the default export
  };
});

describe("CategoryPage", () => {
  const mockSearchResults = [
    { id: "1", title: "Gif 1", url: "http://example.com/gif1" },
    { id: "2", title: "Gif 2", url: "http://example.com/gif2" },
  ];
  const mockCategory = "funny";

  beforeEach(() => {
    // Clear any previous mocks
    vi.clearAllMocks();
  });

  test("renders category name correctly", () => {
    // Mock the useCategoryPageLogic hook to return the mock values
    vi.spyOn(useCategoryPageLogic, "default").mockReturnValue({
      searchResults: mockSearchResults as IGif[],
      category: mockCategory,
    });

    render(
      <GiphyProvider>
        <BrowserRouter>
          <CategoryPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    // Check if the category name is rendered correctly
    expect(screen.getByText("funny GIFs")).toBeInTheDocument();
    expect(screen.getByText("@funny")).toBeInTheDocument();
  });

  test("renders search results", async () => {
    vi.spyOn(useCategoryPageLogic, "default").mockReturnValue({
      searchResults: mockSearchResults as IGif[],
      category: mockCategory,
    });

    render(<GiphyProvider>
        <BrowserRouter>
          <CategoryPage />
        </BrowserRouter>
      </GiphyProvider>);

    // Check if the first search result is rendered
    expect(screen.getByAltText("Gif 1")).toBeInTheDocument();
    expect(screen.getByAltText("Gif 2")).toBeInTheDocument();
  });

  test("formats category with two words correctly", () => {
    const mockCategoryWithTwoWords = "funny-memes";

    // Mock the useCategoryPageLogic hook to return the mock category
    vi.spyOn(useCategoryPageLogic, "default").mockReturnValue({
      searchResults: mockSearchResults as IGif[],
      category: mockCategoryWithTwoWords,
    });

    render(<GiphyProvider>
        <BrowserRouter>
          <CategoryPage />
        </BrowserRouter>
      </GiphyProvider>);

    // Check if the category name is formatted correctly
    expect(screen.getByText("funny & memes GIFs")).toBeInTheDocument();
  });

  test("does not render search results if none are found", async () => {
    // Mock the useCategoryPageLogic hook to return no results
    vi.spyOn(useCategoryPageLogic, "default").mockReturnValue({
      searchResults: [],
      category: mockCategory,
    });

    render(<GiphyProvider>
        <BrowserRouter>
          <CategoryPage />
        </BrowserRouter>
      </GiphyProvider>);

    // Ensure no search result is displayed
    expect(screen.queryByRole("img")).toBeNull();
  });

  test("renders 'Communicate better in chats with gifs' text", () => {
    // Mock the useCategoryPageLogic hook to return the mock values
    vi.spyOn(useCategoryPageLogic, "default").mockReturnValue({
      searchResults: mockSearchResults as IGif[],
      category: mockCategory,
    });

    render(<GiphyProvider>
        <BrowserRouter>
          <CategoryPage />
        </BrowserRouter>
      </GiphyProvider>);

    // Ensure the text 'Communicate better in chats with gifs' is rendered
    expect(screen.getByText("Communicate better in chats with gifs")).toBeInTheDocument();
  });
});

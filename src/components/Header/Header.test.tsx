import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { GiphyContextType } from "../../contexts/Giphy/GiphyContext";
import { GiphyFetch } from "@giphy/js-fetch-api";
import * as useHeaderLogic from "./useHeaderLogic";
import { GiphyProvider } from "../../contexts/Giphy/GiphyProvider";
import { BrowserRouter } from "react-router-dom";

const mockGiphyFetch = {
  trending: vi.fn(), // Mock only the methods needed
} as unknown as GiphyFetch;

// Mocked context values
const mockContextValue: GiphyContextType = {
  giphyFetch: mockGiphyFetch,
  trendingGifs: [],
  setTrendingGifs: vi.fn(),
  favorites: [],
  filter: "gifs",
  setFilter: vi.fn(),
  saveToFavorites: vi.fn(),
};

const useHeaderLogicReturnValue: ReturnType<typeof useHeaderLogic.default> = {
  categories: [],
  favorites: ["1", "2"],
  showCategories: false,
  setShowCategories: vi.fn(),
};

beforeEach(() => {
  // vi.spyOn(GiphyContext, 'useContext').mockImplementation(() => mockContextValue)
//   vi.spyOn(useHeaderLogic, "default").mockImplementation(() => {
//     return useHeaderLogicReturnValue;
//   });
});

// Mocked GiphyProvider for wrapping the Header component
// const MockGiphyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return <GiphyContext.Provider value={mockContextValue}>{children}</GiphyContext.Provider>;
// };

describe("Header Component", () => {
  test("renders the title 'GIPHY-MONT'", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </GiphyProvider>
    );
    expect(screen.getByText("GIPHY-MONT")).toBeInTheDocument();
  });
});

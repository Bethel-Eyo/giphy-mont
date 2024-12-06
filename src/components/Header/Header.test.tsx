import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { GiphyProvider } from "../../contexts/Giphy/GiphyProvider";
import Header from "./Header";
import * as useHeaderLogic from "./useHeaderLogic";

const mockCategories = [
  { name: "Action", name_encoded: "encoded_action", subcategories: [] },
  { name: "Comedy", name_encoded: "encoded_comedy", subcategories: [] },
];

const useHeaderLogicReturnValue: ReturnType<typeof useHeaderLogic.default> = {
  categories: mockCategories,
  favorites: ["1", "2"],
  showCategories: false,
  setShowCategories: vi.fn(),
};

describe("Header Component", () => {
  beforeEach(() => {
    vi.spyOn(useHeaderLogic, "default").mockReturnValue(useHeaderLogicReturnValue);
  });
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

  test("displays the first 5 categories in the header", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </GiphyProvider>
    );
    mockCategories.forEach((category) => {
      const categoryLink = screen.getByText(category.name);
      expect(categoryLink).toBeInTheDocument();
    });
  });

  test("displays the favorite link if there are favorites", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </GiphyProvider>
    );
    const favoriteLink = screen.getByText(/favorite gifs/i);
    expect(favoriteLink).toBeInTheDocument();
  });

  test("does not render the favorites link if there are no favorites", () => {
    vi.spyOn(useHeaderLogic, "default").mockReturnValue({
      ...useHeaderLogicReturnValue,
      favorites: [],
    });

    render(
      <GiphyProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </GiphyProvider>
    );
    const favoriteLink = screen.queryByText(/favorite gifs/i);
    expect(favoriteLink).not.toBeInTheDocument();
  });
});

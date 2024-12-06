import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import FavoritesPage from "./FavoritesPage"; // Adjust path as necessary
import useFavoritesPageLogic from "./useFavoritesPageLogic"; // Adjust path as necessary
import { BrowserRouter } from "react-router-dom";
import { GiphyProvider } from "../../contexts/Giphy/GiphyProvider";

vi.mock("./useFavoritesPageLogic", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("FavoritesPage", () => {
  const mockGiphys = [
    { id: "1", title: "Gif 1", url: "http://example.com/gif1" },
    { id: "2", title: "Gif 2", url: "http://example.com/gif2" },
  ];

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useFavoritesPageLogic as unknown as vi.Mock).mockReturnValue({ savedGiphys: mockGiphys, isLoading: false });
  });

  test("renders title when data has loaded", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <FavoritesPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    // Check if the "My Favorites" text is rendered
    expect(screen.getByText("My Favorites")).toBeInTheDocument();
  });

  test('displays "No favorites" if there are no saved Giphys', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useFavoritesPageLogic as unknown as vi.Mock).mockReturnValue({ savedGiphys: [], isLoading: false });

    render(<FavoritesPage />);

    // Verify that the empty state message is shown when no Giphys are saved
    expect(screen.getByText("No favorites found")).toBeInTheDocument();
  });

  test("displays loading state while fetching saved Giphys", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useFavoritesPageLogic as unknown as vi.Mock).mockReturnValue({
      savedGiphys: [],
      isLoading: true,
    });

    render(<FavoritesPage />);

    const skeletons = screen.getAllByTestId("loading-favs");
    expect(skeletons).toHaveLength(1);
  });
});

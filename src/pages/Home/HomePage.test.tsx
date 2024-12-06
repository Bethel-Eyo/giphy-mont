import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import HomePage from "./HomePage";
import useHomePageLogic from "./useHomePageLogic";

vi.mock("./useHomePageLogic", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/FilterParams/FilterParams", () => ({
  default: () => <div data-testid="filter-params" />,
}));

vi.mock("../../components/Pagination/Pagination", () => ({
  default: ({ page, setPage }: { page: number; setPage: () => void }) => (
    <div data-testid="pagination">
      <span>Page: {page}</span>
      <button onClick={setPage}>Set Page</button>
    </div>
  ),
}));

vi.mock("../../components/GiphyListItem/GiphyListItem", () => ({
  default: ({ trendingGif }: { trendingGif: { id: string } }) => (
    <div data-testid={`giphy-item-${trendingGif.id}`}>GIF: {trendingGif.id}</div>
  ),
}));

vi.mock("../../components/Skeleton/Skeleton", () => ({
  default: () => <div data-testid="skeleton-loader" />,
}));

describe("HomePage", () => {
  const mockSetPage = vi.fn();
  const mockTrendingGifs = [
    { id: "gif1" },
    { id: "gif2" },
    { id: "gif3" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useHomePageLogic as unknown as vi.Mock).mockReturnValue({
      trendingGifs: mockTrendingGifs,
      page: 1,
      setPage: mockSetPage,
      isLoading: false,
    });
  });

  test("renders without crashing", () => {
    render(<HomePage />);
    expect(screen.getByTestId("filter-params")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("displays skeleton loaders when loading", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useHomePageLogic as unknown as vi.Mock).mockReturnValue({
      trendingGifs: [],
      page: 1,
      setPage: mockSetPage,
      isLoading: true,
    });

    render(<HomePage />);
    const skeletons = screen.getAllByTestId("skeleton-loader");
    expect(skeletons).toHaveLength(10); // 10 skeletons as per logic
  });

  test("displays trending gifs", () => {
    render(<HomePage />);
    mockTrendingGifs.forEach((gif) => {
      expect(screen.getByTestId(`giphy-item-${gif.id}`)).toBeInTheDocument();
    });
  });

  test("renders pagination with correct props", () => {
    render(<HomePage />);
    expect(screen.getByText("Page: 1")).toBeInTheDocument();
    const setPageButton = screen.getByText("Set Page");
    setPageButton.click();
    expect(mockSetPage).toHaveBeenCalled();
  });
});

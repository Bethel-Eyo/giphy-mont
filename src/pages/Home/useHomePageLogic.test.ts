import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useHomePageLogic from "./useHomePageLogic";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

vi.mock("../../contexts/Giphy/useGiphyContext");

describe("useHomePageLogic tests", () => {
  const mockGiphyFetch = {
    trending: vi.fn(),
  };
  const mockSetTrendingGifs = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: mockGiphyFetch,
      trendingGifs: [],
      setTrendingGifs: mockSetTrendingGifs,
      filter: "gifs",
    });
  });

  test("should initialize with default values", () => {
    const { result } = renderHook(() => useHomePageLogic());
    expect(result.current.trendingGifs).toEqual([]);
    expect(result.current.page).toBe(0);
  });

  test("should fetch trending gifs and update state", async () => {
    const mockGifs = [{ id: "gif1" }, { id: "gif2" }];
    mockGiphyFetch.trending.mockResolvedValueOnce({ data: mockGifs });

    const { result } = renderHook(() => useHomePageLogic());

    // Simulate the effect that fetches gifs
    await act(async () => {
      await result.current.page; // Triggers useEffect
    });

    expect(mockGiphyFetch.trending).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      type: "gifs",
    });
    expect(mockSetTrendingGifs).toHaveBeenCalledWith(mockGifs);
    expect(result.current.isLoading).toBe(false);
  });

  test("should update page state when setPage is called", () => {
    const { result } = renderHook(() => useHomePageLogic());
    act(() => {
      result.current.setPage(2);
    });
    expect(result.current.page).toBe(2);
  });

  test("should handle errors during fetch", async () => {
    const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    mockGiphyFetch.trending.mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useHomePageLogic());

    await act(async () => {
      await result.current.page; // Triggers useEffect
    });

    expect(mockGiphyFetch.trending).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(result.current.isLoading).toBe(false);

    consoleSpy.mockRestore();
  });
});

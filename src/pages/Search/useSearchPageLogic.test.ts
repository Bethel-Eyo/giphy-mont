import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useSearchPageLogic from "./useSearchPageLogic";
import { useParams } from "react-router-dom";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

// Mock `useGiphyContext` and `useParams`
vi.mock("../../contexts/Giphy/useGiphyContext", () => ({
  useGiphyContext: vi.fn(),
}));
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

describe("useSearchPageLogic", () => {
  const mockGiphyFetch = {
    search: vi.fn(),
  };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: mockGiphyFetch,
      filter: "gifs",
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useParams as vi.Mock).mockReturnValue({ query: "funny" });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSearchPageLogic());

    expect(result.current.searchResults).toEqual([]);
    expect(result.current.page).toBe(0);
    expect(result.current.query).toBe("funny");
  });

  it("should fetch search results and update state", async () => {
    const mockData = { data: [{ id: "1", title: "Test Gif" }] };
    mockGiphyFetch.search.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useSearchPageLogic());

    // Wait for the state to update
    await waitFor(() => expect(result.current.searchResults).toEqual(mockData.data));

    expect(mockGiphyFetch.search).toHaveBeenCalledWith("funny", {
      sort: "relevant",
      lang: "en",
      type: "gifs",
      limit: 10,
      offset: 0,
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle errors gracefully", async () => {
    mockGiphyFetch.search.mockRejectedValueOnce(new Error("Fetch failed"));

    const { result } = renderHook(() => useSearchPageLogic());

    // Wait for the state to update
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.searchResults).toEqual([]);
    expect(mockGiphyFetch.search).toHaveBeenCalledTimes(1);
  });

  it("should update the page and trigger a new search", async () => {
    const mockData = { data: [{ id: "1", title: "New Gif" }] };
    mockGiphyFetch.search.mockResolvedValue(mockData);

    const { result } = renderHook(() => useSearchPageLogic());

    // Update the page
    act(() => {
      result.current.setPage(1);
    });

    // Wait for the state to update
    await waitFor(() => expect(result.current.searchResults).toEqual(mockData.data));

    expect(mockGiphyFetch.search).toHaveBeenCalledWith("funny", {
      sort: "relevant",
      lang: "en",
      type: "gifs",
      limit: 10,
      offset: 10, // New offset due to page = 1
    });
    expect(result.current.page).toBe(1);
  });
});
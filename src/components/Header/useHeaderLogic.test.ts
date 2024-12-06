
import useHeaderLogic from "./useHeaderLogic";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";

// Mock the useGiphyContext hook
vi.mock("../../contexts/Giphy/useGiphyContext", () => ({
  useGiphyContext: vi.fn(),
}));

describe("useHeaderLogic", () => {
  const mockGiphyFetch = {
    categories: vi.fn(),
  };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: mockGiphyFetch,
      favorites: ["1", "2", "3"],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with correct default values", () => {
    const { result } = renderHook(() => useHeaderLogic());

    expect(result.current.categories).toEqual([]);
    expect(result.current.favorites).toEqual(["1", "2", "3"]);
    expect(result.current.showCategories).toBe(false);
  });

  test("fetches categories and updates the state", async () => {
    const mockCategories = [
      { name: "Action", name_encoded: "encoded_action", subcategories: [] },
      { name: "Comedy", name_encoded: "encoded_comedy", subcategories: [] },
    ];

    mockGiphyFetch.categories.mockResolvedValueOnce({ data: mockCategories });

    const { result } = renderHook(() => useHeaderLogic());

    await waitFor(() => result.current.categories.length > 0);

    expect(mockGiphyFetch.categories).toHaveBeenCalled();
    expect(result.current.categories).toEqual(mockCategories);
  });

  test("handles errors during category fetching gracefully", async () => {
    const consoleDebugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    mockGiphyFetch.categories.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useHeaderLogic());

    await waitFor(() => result.current.categories.length === 0);

    expect(mockGiphyFetch.categories).toHaveBeenCalled();
    expect(consoleDebugSpy).toHaveBeenCalledWith("[useHeaderLogic] ", expect.any(Error));
    expect(result.current.categories).toEqual([]);

    consoleDebugSpy.mockRestore();
  });

  test("toggles the 'showCategories' state", () => {
    const { result } = renderHook(() => useHeaderLogic());

    act(() => {
      result.current.setShowCategories(true);
    });

    expect(result.current.showCategories).toBe(true);

    act(() => {
      result.current.setShowCategories(false);
    });

    expect(result.current.showCategories).toBe(false);
  });
});

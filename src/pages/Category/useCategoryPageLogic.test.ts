import { renderHook, act } from "@testing-library/react";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { useParams } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { IGif } from "@giphy/js-types";
import useCategoryPageLogic from "./useCategoryPageLogic";

vi.mock("../../contexts/Giphy/useGiphyContext");
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

describe("useCategoryPageLogic", () => {
  const mockGiphyFetch = {
    gifs: vi.fn(),
  };

  const mockCategory = "funny";

  beforeEach(() => {
    vi.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useParams as vi.Mock).mockReturnValue({ category: mockCategory });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: mockGiphyFetch,
    });
  });

  test("fetches GIFs by category and updates searchResults", async () => {
    const mockData: IGif[] = [
      { id: "1", title: "Funny Gif 1", url: "http://example.com/gif1" } as IGif,
      { id: "2", title: "Funny Gif 2", url: "http://example.com/gif2" } as IGif,
    ];

    mockGiphyFetch.gifs.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useCategoryPageLogic());

    // Trigger the effect
    await act(async () => {});

    expect(mockGiphyFetch.gifs).toHaveBeenCalledWith(mockCategory, mockCategory);
    expect(result.current.searchResults).toEqual(mockData);
    expect(result.current.category).toBe(mockCategory);
  });

  test("handles error during data fetching gracefully", async () => {
    mockGiphyFetch.gifs.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useCategoryPageLogic());

    await act(async () => {});

    expect(mockGiphyFetch.gifs).toHaveBeenCalledWith(mockCategory, mockCategory);
    expect(result.current.searchResults).toEqual([]); // Should remain empty on error
  });

  test("does not fetch data if category is undefined", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useParams as vi.Mock).mockReturnValue({ category: undefined });

    const { result } = renderHook(() => useCategoryPageLogic());

    await act(async () => {});

    expect(mockGiphyFetch.gifs).not.toHaveBeenCalled();
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.category).toBeUndefined();
  });
});

import { GiphyFetch } from "@giphy/js-fetch-api";
import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { GiphyContext, GiphyContextType } from "./GiphyContext";
import { useGiphyContext } from "./useGiphyContext";

describe("useGiphyContext", () => {
  test("throws an error when used outside GiphyProvider", () => {
    expect(() => {
      renderHook(() => useGiphyContext());
    }).toThrow("useGiphyContext must be used within a GiphyProvider");
  });

  test("provides context data when used within GiphyProvider", () => {
    const mockContextValue: GiphyContextType = {
      giphyFetch: {} as GiphyFetch,
      trendingGifs: [],
      setTrendingGifs: vi.fn(),
      favorites: [],
      filter: "gifs",
      setFilter: vi.fn(),
      saveToFavorites: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GiphyContext.Provider value={mockContextValue}>
        {children}
      </GiphyContext.Provider>
    );

    const { result } = renderHook(() => useGiphyContext(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
  });
});

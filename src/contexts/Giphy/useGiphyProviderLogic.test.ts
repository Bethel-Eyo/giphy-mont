import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useGiphyProviderLogic from "./useGiphyProviderLogic";
import { IGif } from "@giphy/js-types";

describe("useGiphyProviderLogic", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test to avoid interference
    vi.restoreAllMocks();
  });

  it("initializes favorites from localStorage", () => {
    localStorage.setItem("favoriteGiphys", JSON.stringify(["gif1", "gif2"]));

    const { result } = renderHook(() => useGiphyProviderLogic());

    expect(result.current.favorites).toEqual(["gif1", "gif2"]);
  });

  it("handles empty or invalid localStorage gracefully", () => {
    localStorage.setItem("favoriteGiphys", "invalid-json");

    const { result } = renderHook(() => useGiphyProviderLogic());

    expect(result.current.favorites).toEqual([]);
  });

  it("adds a gif ID to favorites", () => {
    const { result } = renderHook(() => useGiphyProviderLogic());

    act(() => {
      result.current.saveToFavorites("gif1");
    });

    expect(result.current.favorites).toEqual(["gif1"]);
    expect(localStorage.getItem("favoriteGiphys")).toBe(JSON.stringify(["gif1"]));
  });

  it("removes a gif ID from favorites", () => {
    localStorage.setItem("favoriteGiphys", JSON.stringify(["gif1", "gif2"]));

    const { result } = renderHook(() => useGiphyProviderLogic());

    act(() => {
      result.current.saveToFavorites("gif1");
    });

    expect(result.current.favorites).toEqual(["gif2"]);
    expect(localStorage.getItem("favoriteGiphys")).toBe(JSON.stringify(["gif2"]));
  });

  it("sets trendingGifs state", () => {
    const { result } = renderHook(() => useGiphyProviderLogic());

    const newGifs = [{ id: "gif1" }, { id: "gif2" }] as IGif[];

    act(() => {
      result.current.setTrendingGifs(newGifs);
    });

    expect(result.current.trendingGifs).toEqual(newGifs);
  });

  it("sets filter state", () => {
    const { result } = renderHook(() => useGiphyProviderLogic());

    act(() => {
      result.current.setFilter("stickers");
    });

    expect(result.current.filter).toBe("stickers");
  });

  it("saves and retrieves complex state updates correctly", () => {
    const { result } = renderHook(() => useGiphyProviderLogic());

    act(() => {
      result.current.saveToFavorites("gif1");
    });

    act(() => {
      result.current.saveToFavorites("gif2");
    });

    expect(result.current.favorites).toEqual(["gif1", "gif2"]);

    act(() => {
      result.current.saveToFavorites("gif1");
    });

    expect(result.current.favorites).toEqual(["gif2"]);
  });
});

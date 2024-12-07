import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { useParams } from "react-router-dom";
import useGifDetailPageLogic from './useGifDetailPageLogic';

vi.mock("../../contexts/Giphy/useGiphyContext", () => ({
    useGiphyContext: vi.fn(),
  }));
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

describe('useGifDetailPageLogic', () => {
  const mockGiphy = {
    id: "123",
    title: "Test Gif",
    user: {
      display_name: "Test User",
      username: "testuser",
      avatar_url: "https://avatar.url",
    },
    source: "https://giphy.com",
  };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: {
        gif: vi.fn().mockResolvedValue({ data: mockGiphy }),
      },
      saveToFavorites: vi.fn(),
      favorites: [],
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useParams as vi.Mock).mockReturnValue({ type: "gifs", slug: "test-gif-123" });
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() => useGifDetailPageLogic());

    expect(result.current.giphy).toBeUndefined();
    expect(result.current.readMore).toBe(false);
    expect(result.current.favorites).toEqual([]);
  });

  test('should fetch a GIF based on the slug from the URL', async () => {
    const { result } = renderHook(() => useGifDetailPageLogic());

    // Manually triggering the async operation
    await act(async () => {
      await result.current.getSingleGiphy();
    });

    // Check if the giphy data is fetched correctly
    expect(result.current.giphy).toEqual(mockGiphy);
  });

  test('should handle errors when fetching the GIF', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValueOnce({
      giphyFetch: {
        gif: vi.fn().mockRejectedValue(new Error("Failed to fetch")),
      },
      saveToFavorites: vi.fn(),
      favorites: [],
    });

    const { result } = renderHook(() => useGifDetailPageLogic());

    // Manually triggering the async operation
    await act(async () => {
      await result.current.getSingleGiphy();
    });

    // Assert that giphy remains undefined in case of an error
    expect(result.current.giphy).toBeUndefined();
  });

  test('should call saveToFavorites when adding a gif to favorites', async () => {
    const { result } = renderHook(() => useGifDetailPageLogic());

    // Manually triggering the async operation
    await act(async () => {
      await result.current.getSingleGiphy();
    });

    // Act: Simulate saving the GIF to favorites
    act(() => {
      result.current.saveToFavorites(mockGiphy.id);
    });

    // Verify that saveToFavorites was called with the correct ID
    expect(useGiphyContext().saveToFavorites).toHaveBeenCalledWith(mockGiphy.id);
  });

  test('should toggle readMore correctly', () => {
    const { result } = renderHook(() => useGifDetailPageLogic());

    // Initially, readMore is false
    expect(result.current.readMore).toBe(false);

    // Act: Toggle readMore to true
    act(() => {
      result.current.setReadMore(true);
    });

    // Assert that readMore is true
    expect(result.current.readMore).toBe(true);

    // Act: Toggle readMore back to false
    act(() => {
      result.current.setReadMore(false);
    });

    // Assert that readMore is false again
    expect(result.current.readMore).toBe(false);
  });
});

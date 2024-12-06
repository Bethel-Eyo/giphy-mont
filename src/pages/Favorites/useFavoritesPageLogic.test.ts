import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import useFavoritesPageLogic from './useFavoritesPageLogic'; // Adjust path as necessary
import { useGiphyContext } from '../../contexts/Giphy/useGiphyContext';

// Mocking the useGiphyContext hook
vi.mock('../../contexts/Giphy/useGiphyContext', () => ({
  __esModule: true,
  useGiphyContext: vi.fn(),
}));

describe('useFavoritesPageLogic', () => {
  const mockFavorites = ['1', '2'];
  const mockGifs = [
    { id: '1', title: 'Gif 1', url: 'http://example.com/gif1' },
    { id: '2', title: 'Gif 2', url: 'http://example.com/gif2' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test('fetches and sets saved Giphys successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: { gifs: vi.fn().mockResolvedValue({ data: mockGifs }) },
      favorites: mockFavorites,
    });

    // Render the hook
    const { result } = renderHook(() => useFavoritesPageLogic());

    await act(async () => {
      await result.current.isLoading; // wait for the state to update
    });

    // Check if savedGiphys is populated correctly
    expect(result.current.savedGiphys).toEqual(mockGifs);
    expect(result.current.isLoading).toBe(false);
  });

  test('sets loading state correctly during fetch', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: { gifs: vi.fn().mockResolvedValue({ data: mockGifs }) },
      favorites: mockFavorites,
    });

    // Render the hook
    const { result } = renderHook(() => useFavoritesPageLogic());

    // Initial state should be loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to finish fetching data
    await act(async () => {
      await result.current.isLoading; // wait for state to update
    });

    // Check if loading state is set to false after the fetch
    expect(result.current.isLoading).toBe(false);
  });

  test('handles errors gracefully', async () => {
    // Mock the useGiphyContext hook with a rejected API call
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: { gifs: vi.fn().mockRejectedValue(new Error('Failed to fetch')) },
      favorites: mockFavorites,
    });

    // Render the hook
    const { result } = renderHook(() => useFavoritesPageLogic());

    // Wait for the hook to finish loading
    await act(async () => {
      await result.current.isLoading; // wait for state to update
    });

    // Ensure savedGiphys is still empty due to error
    expect(result.current.savedGiphys).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  test('does not fetch Giphys when favorites is empty', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      giphyFetch: { gifs: vi.fn() },
      favorites: [],
    });

    // Render the hook
    const { result } = renderHook(() => useFavoritesPageLogic());

    // Ensure that savedGiphys is empty
    expect(result.current.savedGiphys).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});

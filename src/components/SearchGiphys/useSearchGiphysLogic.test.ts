import { describe, expect, test, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import useSearchGiphysLogic from './useSearchGiphysLogic';

// Mock useNavigate from 'react-router-dom'
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useSearchGiphysLogic Hook', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  let navigate: vi.Mock;

  beforeEach(() => {
    navigate = vi.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useNavigate as vi.Mock).mockReturnValue(navigate);
  });

  test('should update searchQuery when setSearchQuery is called', async () => {
    const { result } = renderHook(() => useSearchGiphysLogic());

    // Initially searchQuery should be empty
    expect(result.current.searchQuery).toBe('');

    // Update searchQuery using setSearchQuery
    act(() => {
      result.current.setSearchQuery('funny');
    });

    // The searchQuery should be updated
    expect(result.current.searchQuery).toBe('funny');
  });

  test('should call navigate with correct URL when searchForGiphy is called with a query', async () => {
    const { result } = renderHook(() => useSearchGiphysLogic());

    // Set searchQuery
    act(() => {
      result.current.setSearchQuery('funny');
    });

    // Call searchForGiphy
    await act(async () => {
      await result.current.searchForGiphy();
    });

    // Ensure navigate is called with the correct URL
    expect(navigate).toHaveBeenCalledWith('/search/funny');
  });

  test('should not call navigate when searchQuery is empty', async () => {
    const { result } = renderHook(() => useSearchGiphysLogic());

    // Call searchForGiphy with an empty searchQuery
    await act(async () => {
      await result.current.searchForGiphy();
    });

    // Ensure navigate was not called
    expect(navigate).not.toHaveBeenCalled();
  });

  test('should reset searchQuery and navigate to home when quitSearch is called', async () => {
    const { result } = renderHook(() => useSearchGiphysLogic());

    // Set searchQuery
    act(() => {
      result.current.setSearchQuery('funny');
    });

    // Call quitSearch
    await act(async () => {
      result.current.quitSearch();
    });

    // Ensure searchQuery is reset and navigate is called
    expect(result.current.searchQuery).toBe('');
    expect(navigate).toHaveBeenCalledWith('/');
  });
});

import { render, screen, fireEvent, act } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SearchGiphys from './SearchGiphys';
import useSearchGiphysLogic from './useSearchGiphysLogic';

// Mock the useSearchGiphysLogic hook
vi.mock('./useSearchGiphysLogic', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('SearchGiphys Component tests', () => {
  const searchForGiphyMock = vi.fn();
  const setSearchQueryMock = vi.fn();
  const quitSearchMock = vi.fn();

  beforeEach(() => {
    // Reset mock functions before each test
    searchForGiphyMock.mockClear();
    setSearchQueryMock.mockClear();
    quitSearchMock.mockClear();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useSearchGiphysLogic as vi.Mock).mockReturnValue({
      searchForGiphy: searchForGiphyMock,
      searchQuery: '',
      setSearchQuery: setSearchQueryMock,
      quitSearch: quitSearchMock,
    });
  });

  test('renders the input field', () => {
    render(<SearchGiphys />);
    const inputElement = screen.getByPlaceholderText('search for gifs and stickers');
    expect(inputElement).toBeInTheDocument();
  });

  test('updates searchQuery state when the input value changes', async () => {
    render(<SearchGiphys />);
    
    const inputElement = screen.getByPlaceholderText('search for gifs and stickers');
    
    // Simulate typing into the input field
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'funny gifs' } });
    });
    
    // Ensure setSearchQuery was called with the correct value
    expect(setSearchQueryMock).toHaveBeenCalledWith('funny gifs');
  });

  test('shows the quit button when there is a search query', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useSearchGiphysLogic as vi.Mock).mockReturnValue({
      searchForGiphy: searchForGiphyMock,
      searchQuery: 'funny gifs',
      setSearchQuery: setSearchQueryMock,
      quitSearch: quitSearchMock,
    });

    render(<SearchGiphys />);
    const quitButton = screen.getByRole('button', { name: /close/i });
    expect(quitButton).toBeInTheDocument();
  });

  test('calls quitSearch when the quit button is clicked', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useSearchGiphysLogic as vi.Mock).mockReturnValue({
      searchForGiphy: searchForGiphyMock,
      searchQuery: 'funny gifs',
      setSearchQuery: setSearchQueryMock,
      quitSearch: quitSearchMock,
    });

    render(<SearchGiphys />);
    const quitButton = screen.getByRole('button', { name: /close/i });
    
    // Simulate clicking the quit button
    fireEvent.click(quitButton);

    // Ensure quitSearch was called
    expect(quitSearchMock).toHaveBeenCalled();
  });

  test('calls searchForGiphy when the search button is clicked', async () => {
    render(<SearchGiphys />);
    
    const searchButton = screen.getByRole('button', { name: /magnifying glass/i });

    // Simulate clicking the search button
    fireEvent.click(searchButton);

    // Ensure searchForGiphy was called
    expect(searchForGiphyMock).toHaveBeenCalled();
  });

  test('disables quit button and hides it when searchQuery is empty', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useSearchGiphysLogic as vi.Mock).mockReturnValue({
      searchForGiphy: searchForGiphyMock,
      searchQuery: '',
      setSearchQuery: setSearchQueryMock,
      quitSearch: quitSearchMock,
    });

    render(<SearchGiphys />);
    
    const quitButton = screen.queryByRole('button', { name: /close/i });
    expect(quitButton).toBeNull();
  });
});

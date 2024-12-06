import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import FilterParams from './FilterParams';
import { useGiphyContext } from '../../contexts/Giphy/useGiphyContext';

// Mocking the useGiphyContext hook
vi.mock('../../contexts/Giphy/useGiphyContext', () => ({
  useGiphyContext: vi.fn(),
}));

describe('FilterParams Component tests', () => {
  const setFilterMock = vi.fn();
  
  beforeEach(() => {
    setFilterMock.mockClear();
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGiphyContext as vi.Mock).mockReturnValue({
      filter: 'gifs',  // Initial filter value
      setFilter: setFilterMock,  // Mock setFilter function
    });
  });

  test('renders all filter options correctly', () => {
    render(<FilterParams />);
    
    // Check if all filter options are rendered
    expect(screen.getByText('GIFs')).toBeInTheDocument();
    expect(screen.getByText('Stickers')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  test('applies the correct background to the selected filter', () => {
    render(<FilterParams />);
    
    // Check if the "GIFs" filter has the correct background color applied (selected state)
    const gifsFilter = screen.getByText('GIFs');
    expect(gifsFilter).toHaveClass(
      'bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500'
    );
    
    // Check if other filters don't have the selected background color
    const stickersFilter = screen.getByText('Stickers');
    expect(stickersFilter).not.toHaveClass(
      'bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500'
    );
  });

  test('calls setFilter with the correct value when a filter is clicked', () => {
    render(<FilterParams />);
    
    // Click the "Stickers" filter
    fireEvent.click(screen.getByText('Stickers'));
    
    // Assert that setFilter was called with "stickers"
    expect(setFilterMock).toHaveBeenCalledWith('stickers');
  });

  test('does not apply background color if the filter is not selected', () => {
    render(<FilterParams />);
    
    // Check if non-selected filters do not have background color
    const textFilter = screen.getByText('Text');
    expect(textFilter).not.toHaveClass(
      'bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500'
    );
  });
});

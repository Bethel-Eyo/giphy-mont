import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { describe, test, expect, vi, afterEach } from "vitest";
import usePaginationLogic from './usePaginationLogic';

// Mock the usePaginationLogic hook
vi.mock('./usePaginationLogic', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    nextPage: vi.fn(),
    prevPage: vi.fn(),
  })),
}));

describe('Pagination Component', () => {
  const setPageMock = vi.fn(); // Mock setPage function

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the pagination component with the correct page number', () => {
    render(<Pagination page={0} setPage={setPageMock} />);

    // Check if the page number is rendered correctly
    const pageNumber = screen.getByText('Page 1');
    expect(pageNumber).toBeInTheDocument();
  });

  test('disables the "Previous" button when the page is 0', () => {
    render(<Pagination page={0} setPage={setPageMock} />);

    // Check if the "Previous" button is disabled when page is 0
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('enables the "Previous" button when the page is greater than 0', () => {
    render(<Pagination page={1} setPage={setPageMock} />);

    // Check if the "Previous" button is enabled when page is > 0
    const prevButton = screen.getByText('Previous');
    expect(prevButton).not.toBeDisabled();
  });

  test('calls nextPage when the "Next" button is clicked', () => {
    const nextPageMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (usePaginationLogic as vi.Mock).mockReturnValue({ nextPage: nextPageMock, prevPage: vi.fn() });

    render(<Pagination page={0} setPage={setPageMock} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(nextPageMock).toHaveBeenCalled();
  });

  test('calls prevPage when the "Previous" button is clicked', () => {
    const prevPageMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (usePaginationLogic as vi.Mock).mockReturnValue({ nextPage: vi.fn(), prevPage: prevPageMock });

    render(<Pagination page={1} setPage={setPageMock} />);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(prevPageMock).toHaveBeenCalled();
  });
});

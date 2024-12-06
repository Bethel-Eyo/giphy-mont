import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import GifDetailPage from "./GifDetailPage";
import useGifDetailPageLogic from "./useGifDetailPageLogic";
import { GiphyProvider } from "../../contexts/Giphy/GiphyProvider";
import { BrowserRouter } from "react-router-dom";

vi.mock("./useGifDetailPageLogic");

describe("GifDetailPage", () => {
  const mockLogic = {
    giphy: {
      id: "testGifId",
      title: "Test Gif",
      user: {
        avatar_url: "https://example.com/avatar.png",
        display_name: "Test User",
        username: "testuser",
        about_bio: "This is a test bio for the user.",
      },
      source: "https://example.com/source",
    },
    readMore: false,
    setReadMore: vi.fn(),
    saveToFavorites: vi.fn(),
    favorites: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGifDetailPageLogic as vi.Mock).mockReturnValue(mockLogic);
  });

  test("renders user information and gif details", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <GifDetailPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    /// Select elements by data-testid
    const userAvatar = screen.getByTestId("user-avatar");
    const gifImage = screen.getByTestId("gif-image");

    // Assert that the elements are rendered correctly
    expect(userAvatar).toBeInTheDocument();
    expect(gifImage).toBeInTheDocument();
  });

  test("toggles 'Read more' and 'Read less' functionality", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <GifDetailPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    const readMoreButton = screen.getByText(/Read more/i);

    // Simulate clicking 'Read more'
    fireEvent.click(readMoreButton);
    expect(mockLogic.setReadMore).toHaveBeenCalledWith(true);

    // Simulate clicking 'Read less'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGifDetailPageLogic as vi.Mock).mockReturnValue({ ...mockLogic, readMore: true });
    render(
      <GiphyProvider>
        <BrowserRouter>
          <GifDetailPage />
        </BrowserRouter>
      </GiphyProvider>
    ); // Re-render with updated state

    const readLessButton = screen.getByText(/Read less/i);
    fireEvent.click(readLessButton);
    expect(mockLogic.setReadMore).toHaveBeenCalledWith(false);
  });

  test("renders source link if available", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <GifDetailPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    const sourceLink = screen.getByText(mockLogic.giphy.source);
    expect(sourceLink).toHaveAttribute("href", mockLogic.giphy.source);
    expect(sourceLink).toHaveAttribute("target", "_blank");
  });

  test("handles 'Save to Favorites' functionality", () => {
    render(
      <GiphyProvider>
        <BrowserRouter>
          <GifDetailPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(favoriteButton);

    expect(mockLogic.saveToFavorites).toHaveBeenCalledWith(mockLogic.giphy.id);
  });

  test("highlights favorite icon if the gif is in favorites", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useGifDetailPageLogic as vi.Mock).mockReturnValue({
      ...mockLogic,
      favorites: ["testGifId"],
    });

    render(
      <GiphyProvider>
        <BrowserRouter>
          <GifDetailPage />
        </BrowserRouter>
      </GiphyProvider>
    );

    const favoriteIcon = screen.getByTestId("favorite-icon");
    expect(favoriteIcon).toHaveClass("text-red-500 scale-150");
  });
});

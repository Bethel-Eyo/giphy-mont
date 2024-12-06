import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';  // Needed to test the Link component
import GiphyListItem from './GiphyListItem';
import { IGif, IImages, IUser } from '@giphy/js-types';

// Mocking IGif object for testing
const mockTrendingGif: IGif = {
  id: '1',
  slug: 'slug1',
  type: 'gif',
  title: 'Test Gif',
  images: {
    fixed_width: {
      webp: 'https://example.com/gif1.webp',
    },
  } as IImages,
  user: {
    display_name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
  } as IUser,
} as IGif;

describe('GiphyListItem Component tests', () => {
  test('renders the image and title', () => {
    render(
      <MemoryRouter>
        <GiphyListItem trendingGif={mockTrendingGif} />
      </MemoryRouter>
    );
    const image = screen.getByAltText('Test Gif');  // Query by alt text instead of role
    expect(image).toHaveAttribute('src', 'https://example.com/gif1.webp');
  });

  test('renders the hover effect with user info when hover is true', () => {
    render(
      <MemoryRouter>
        <GiphyListItem trendingGif={mockTrendingGif} hover={true} />
      </MemoryRouter>
    );

    const hoverText = screen.getByText('Test User');
    expect(hoverText).toBeInTheDocument();
    const avatar = screen.getByAltText('Test User');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  test('does not render the hover effect when hover is false', () => {
    render(
      <MemoryRouter>
        <GiphyListItem trendingGif={mockTrendingGif} hover={false} />
      </MemoryRouter>
    );

    const hoverText = screen.queryByText('Test User');
    expect(hoverText).not.toBeInTheDocument();
  });

  test('renders the correct link based on the trendingGif prop', () => {
    render(
      <MemoryRouter>
        <GiphyListItem trendingGif={mockTrendingGif} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/gifs/slug1');
  });

  test('handles navigation correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <GiphyListItem trendingGif={mockTrendingGif} />
      </MemoryRouter>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/gifs/slug1');
  });
});

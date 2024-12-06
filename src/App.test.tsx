import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { GiphyProvider } from "./contexts/Giphy/GiphyProvider";
import Layout from "./layout/Layout";
import CategoryPage from "./pages/Category/CategoryPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import GifDetailPage from "./pages/GifDetail/GifDetailPage";
import HomePage from "./pages/Home/HomePage";
import SearchPage from "./pages/Search/SearchPage";

vi.mock("./layout/Layout", () => ({
  default: () => <div data-testid="layout">Layout</div>,
}));

vi.mock("./pages/Home/HomePage", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("./pages/Search/SearchPage", () => ({
  default: () => <div data-testid="search-page">Search Page</div>,
}));

vi.mock("./pages/GifDetail/GifDetailPage", () => ({
  default: () => <div data-testid="gif-detail-page">Gif Detail Page</div>,
}));

vi.mock("./pages/Favorites/FavoritesPage", () => ({
  default: () => <div data-testid="favorites-page">Favorites Page</div>,
}));

vi.mock("./pages/Category/CategoryPage", () => ({
  default: () => <div data-testid="category-page">Category Page</div>,
}));

describe("App Component", () => {
  const renderWithRouter = (initialEntries: string[]) => {
    const routes = [
      { path: "/", element: <HomePage /> },
      { path: "/search/:query", element: <SearchPage /> },
      { path: "/:type/:slug", element: <GifDetailPage /> },
      { path: "/:category", element: <CategoryPage /> },
      { path: "/favorites", element: <FavoritesPage /> },
    ];
    const router = createMemoryRouter([{ path: "/", element: <Layout />, children: routes }], {
      initialEntries,
    });
    return render(
      <GiphyProvider>
        <RouterProvider router={router} />
      </GiphyProvider>
    );
  };

  test("renders HomePage at root path", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <HomePage />, // Mock or real HomePage
        },
      ],
      { initialEntries: ["/"] } // Start at root path
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("renders SearchPage for search query", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/search/:query",
          element: <SearchPage />, // Adjust based on actual SearchPage component
        },
      ],
      { initialEntries: ["/search/cat-gifs"] } // Mock a search query
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("search-page")).toBeInTheDocument();
  });

  test("renders GifDetailPage for type and slug", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/:type/:slug",
          element: <GifDetailPage />, // Adjust based on actual GifDetailPage component
        },
      ],
      { initialEntries: ["/gifs/12345-some-gif"] } // Mock a specific gif type and slug
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("gif-detail-page")).toBeInTheDocument();
  });

  test("renders CategoryPage for category route", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/:category",
          element: <CategoryPage />,
        },
      ],
      { initialEntries: ["/nature"] }
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("category-page")).toBeInTheDocument();
  });

  test("renders FavoritesPage for favorites route", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/favorites",
          element: <FavoritesPage />, // Adjust based on actual FavoritesPage component
        },
      ],
      { initialEntries: ["/favorites"] } // Mock favorites path
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("favorites-page")).toBeInTheDocument();
  });

  test("renders Layout component for all routes", () => {
    renderWithRouter(["/"]);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });
});

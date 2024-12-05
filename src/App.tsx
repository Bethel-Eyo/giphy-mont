import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import HomePage from "./pages/Home/HomePage";
import SearchPage from "./pages/Search/SearchPage";
import GifDetailPage from "./pages/GifDetail/GifDetailPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import { GiphyProvider } from "./contexts/Giphy/GiphyProvider";
import CategoryPage from "./pages/Category/CategoryPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />, // shows trending gifs
      },
      {
        path: "/search/:query",
        element: <SearchPage />,
      },
      {
        path: "/:type/:slug",
        element: <GifDetailPage />,
      },
      {
        path: "/:category",
        element: <CategoryPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

function App() {
  return (
    <GiphyProvider>
      <RouterProvider router={router} />;
    </GiphyProvider>
  );
}

export default App;

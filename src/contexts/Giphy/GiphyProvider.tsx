import { GiphyFetch } from "@giphy/js-fetch-api";
import { FC } from "react";
import { GiphyContext } from "./GiphyContext";
import useGiphyProviderLogic from "./useGiphyProviderLogic";

const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

export const GiphyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { trendingGifs, setTrendingGifs, filter, setFilter, saveToFavorites, favorites } =
    useGiphyProviderLogic();

  return (
    <GiphyContext.Provider
      value={{
        giphyFetch,
        trendingGifs,
        setTrendingGifs,
        favorites,
        filter,
        setFilter,
        saveToFavorites,
      }}
    >
      {children}
    </GiphyContext.Provider>
  );
};

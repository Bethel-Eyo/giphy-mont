import { GiphyFetch, MediaType } from "@giphy/js-fetch-api";
import { GiphyContext } from "./GiphyContext";
import { FC, useState } from "react";
import { IGif } from "@giphy/js-types";

const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

export const GiphyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trendingGifs, setTrendingGifs] = useState<IGif[]>([]);
  const [filter, setFilter] = useState<MediaType>("gifs");
  const [favorites, setFavorites] = useState<IGif[]>([]);

  return (
    <GiphyContext.Provider
      value={{ giphyFetch, trendingGifs, setTrendingGifs, favorites, filter, setFilter }}
    >
      {children}
    </GiphyContext.Provider>
  );
};

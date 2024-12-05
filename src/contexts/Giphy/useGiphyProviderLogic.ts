import { MediaType } from "@giphy/js-fetch-api";
import { IGif, GifID } from "@giphy/js-types";
import { useState, useEffect, useMemo, useCallback } from "react";

const useGiphyProviderLogic = () => {
  const [trendingGifs, setTrendingGifs] = useState<IGif[]>([]);
  const [filter, setFilter] = useState<MediaType>("gifs");
  const [favorites, setFavorites] = useState<GifID[]>([]);

  const saveToFavorites = useCallback(
    (id: GifID) => {
      if (favorites.includes(id)) {
        // If the item is already in favorites, remove it
        const updatedFavorites = favorites.filter((itemId) => itemId !== id);
        localStorage.setItem("favoriteGiphys", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      } else {
        // If the item is not in favorites, add it
        const updatedFavorites = [...favorites];
        updatedFavorites.push(id);
        localStorage.setItem("favoriteGiphys", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      }
    },
    [favorites]
  );

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteGiphys");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(favorites);
    } catch (error) {
      console.debug("[GiphyProvider] ", error);
    }
  }, []);

  return useMemo(
    () => ({ trendingGifs, setTrendingGifs, filter, setFilter, saveToFavorites, favorites }),
    [trendingGifs, setTrendingGifs, filter, setFilter, saveToFavorites, favorites]
  );
};

export default useGiphyProviderLogic;

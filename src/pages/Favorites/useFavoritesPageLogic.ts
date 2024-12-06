import { IGif } from "@giphy/js-types";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

const useFavoritesPageLogic = () => {
  const { giphyFetch, favorites } = useGiphyContext();
  const [savedGiphys, setSavedGiphys] = useState<IGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSavedGiphys = useCallback(async () => {
    if (favorites.length > 0) {
      try {
        setIsLoading(true);
        const { data: gifs } = await giphyFetch.gifs(favorites as string[]);
        setSavedGiphys(gifs);
      } catch (error) {
        console.debug("[useFavoritesPageLogic] getSavedGiphys ", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [favorites, giphyFetch]);

  useEffect(() => {
    getSavedGiphys();
  }, [getSavedGiphys]);

  return useMemo(() => ({ savedGiphys, isLoading }), [savedGiphys, isLoading]);
};

export default useFavoritesPageLogic;

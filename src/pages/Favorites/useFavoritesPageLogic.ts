import { IGif } from "@giphy/js-types";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

const useFavoritesPageLogic = () => {
  const { giphyFetch, favorites } = useGiphyContext();
  const [savedGiphys, setSavedGiphys] = useState<IGif[]>([]);

  const getSavedGiphys = useCallback(async () => {
    // TODO: Fix potential favorites as string[] issue
    try {
      const { data: gifs } = await giphyFetch.gifs(favorites as string[]);
      setSavedGiphys(gifs);
    } catch (error) {
        console.debug('[useFavoritesPageLogic] getSavedGiphys ', error)
    }
  }, [favorites, giphyFetch]);

  useEffect(() => {
    getSavedGiphys();
  }, [getSavedGiphys]);

  return useMemo(() => ({ savedGiphys }), [savedGiphys]);
};

export default useFavoritesPageLogic;

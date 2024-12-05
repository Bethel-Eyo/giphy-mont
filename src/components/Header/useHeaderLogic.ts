import { ICategory } from "@giphy/js-fetch-api";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

const useHeaderLogic = () => {
  const { giphyFetch, favorites } = useGiphyContext();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showCategories, setShowCategories] = useState(false);

  const fetchGiphyCategories = useCallback(async () => {
    try {
      const { data } = await giphyFetch.categories();
      setCategories(data);
    } catch (error) {
      console.debug("[useHeaderLogic] ", error);
    }
  }, [giphyFetch]);

  useEffect(() => {
    fetchGiphyCategories();
  }, [fetchGiphyCategories]);

  return useMemo(
    () => ({ categories, favorites, showCategories, setShowCategories }),
    [categories, favorites, showCategories, setShowCategories]
  );
};

export default useHeaderLogic;

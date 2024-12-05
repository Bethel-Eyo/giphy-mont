import { IGif } from "@giphy/js-types";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

const useCategoryPageLogic = () => {
  const [searchResults, setSearchResults] = useState<IGif[]>([]);
  const { giphyFetch } = useGiphyContext();

  const { category } = useParams();

  const getGiphysByCategory = useCallback(async () => {
    try {
      if (category) {
        const { data } = await giphyFetch.gifs(category, category);

        setSearchResults(data);
      }
    } catch (error) {
      console.debug("[CategoryPage] getGiphysByCategory", error);
    }
  }, [category, giphyFetch]);

  useEffect(() => {
    getGiphysByCategory();
  }, [category, getGiphysByCategory]);

  return useMemo(() => ({ searchResults, category }), [searchResults, category]);
};

export default useCategoryPageLogic;

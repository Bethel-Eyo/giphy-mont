import { useParams } from "react-router-dom";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { useEffect, useMemo, useState, useCallback } from "react";
import { IGif } from "@giphy/js-types";

const useSearchPageLogic = () => {
  const [searchResults, setSearchResults] = useState<IGif[]>([]);

  const { giphyFetch, filter } = useGiphyContext();

  const { query } = useParams();

  const getSearchResults = useCallback(async () => {
    try {
      if (query) {
        const { data } = await giphyFetch.search(query, {
          sort: "relevant",
          lang: "en",
          type: filter,
          limit: 10,
        });

        setSearchResults(data);
      }
    } catch (error) {
      console.debug("[useSearchPageLogic] getSearchResults ", error);
    }
  }, [filter, giphyFetch, query]);

  useEffect(() => {
    getSearchResults();
  }, [filter, getSearchResults]);

  return useMemo(() => ({ searchResults, query }), [searchResults, query]);
};

export default useSearchPageLogic;

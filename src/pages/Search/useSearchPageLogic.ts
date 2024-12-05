import { useParams } from "react-router-dom";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { useEffect, useMemo, useState, useCallback } from "react";
import { IGif } from "@giphy/js-types";

const useSearchPageLogic = () => {
  const [searchResults, setSearchResults] = useState<IGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { giphyFetch, filter } = useGiphyContext();

  const { query } = useParams();
  const [page, setPage] = useState(0);
  const gifsPerPage = 10;

  const getSearchResults = useCallback(async () => {
    try {
      if (query) {
        setIsLoading(true);
        const { data } = await giphyFetch.search(query, {
          sort: "relevant",
          lang: "en",
          type: filter,
          limit: gifsPerPage,
          offset: page * gifsPerPage,
        });

        setSearchResults(data);
      }
    } catch (error) {
      console.debug("[useSearchPageLogic] getSearchResults ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter, giphyFetch, page, query]);

  useEffect(() => {
    getSearchResults();
  }, [filter, getSearchResults]);

  return useMemo(
    () => ({ searchResults, query, page, setPage, isLoading }),
    [searchResults, query, page, setPage, isLoading]
  );
};

export default useSearchPageLogic;

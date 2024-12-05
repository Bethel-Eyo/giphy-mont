import { useEffect, useMemo, useCallback, useState } from "react";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

const useHomePageLogic = () => {
  const { giphyFetch, trendingGifs, setTrendingGifs, filter } = useGiphyContext();
  const [page, setPage] = useState(0);
  const gifsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrendingGifs = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await giphyFetch.trending({
        limit: gifsPerPage,
        offset: page * gifsPerPage,
        type: filter,
      });
      setTrendingGifs(data);
    } catch (error) {
      console.debug(error);
    } finally {
      setIsLoading(false);
    }
  }, [filter, giphyFetch, page, setTrendingGifs]);

  useEffect(() => {
    fetchTrendingGifs();
  }, [fetchTrendingGifs, filter]);

  return useMemo(
    () => ({ trendingGifs, page, setPage, isLoading }),
    [trendingGifs, page, setPage, isLoading]
  );
};

export default useHomePageLogic;

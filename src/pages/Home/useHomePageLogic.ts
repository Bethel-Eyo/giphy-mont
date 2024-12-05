import { useEffect, useMemo, useCallback } from "react";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

const useHomePageLogic = () => {
    const { giphyFetch, trendingGifs, setTrendingGifs, filter } = useGiphyContext();
  const fetchTrendingGifs = useCallback(async () => {
    try {
      const { data } = await giphyFetch.trending({ limit: 10, type: filter });
      setTrendingGifs(data);
    } catch (error) {
      console.debug(error);
    }
  }, [filter, giphyFetch, setTrendingGifs]);

  useEffect(() => {
    fetchTrendingGifs();
  }, [fetchTrendingGifs, filter]);

  return useMemo(() => ({trendingGifs}), [trendingGifs])
};

export default useHomePageLogic;
import { useEffect } from "react";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import { IGif } from "@giphy/js-types";
import FilterParams from "../../components/FilterParams/FilterParams";

const HomePage = () => {
  const { giphyFetch, trendingGifs, setTrendingGifs, filter } = useGiphyContext();
  const fetchTrendingGifs = async () => {
    try {
      const { data } = await giphyFetch.trending({ limit: 10, type: filter });
      setTrendingGifs(data);
    } catch (error) {
      console.debug(error);
    }
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <FilterParams />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {trendingGifs.map((trendingGif: IGif) => (
          <GiphyListItem trendingGif={trendingGif} key={trendingGif.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

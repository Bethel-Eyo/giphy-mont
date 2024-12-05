import { IGif } from "@giphy/js-types";
import FilterParams from "../../components/FilterParams/FilterParams";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import useHomePageLogic from "./useHomePageLogic";

const HomePage = () => {
  const { trendingGifs } = useHomePageLogic();

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

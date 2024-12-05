import { IGif } from "@giphy/js-types";
import FilterParams from "../../components/FilterParams/FilterParams";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import useHomePageLogic from "./useHomePageLogic";
import Pagination from "../../components/Pagination/Pagination";

const HomePage = () => {
  const { trendingGifs, page, setPage } = useHomePageLogic();

  return (
    <div>
      <FilterParams />
      <Pagination page={page} setPage={setPage} />
      <div className="mt-3 columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {trendingGifs.map((trendingGif: IGif) => (
          <GiphyListItem trendingGif={trendingGif} key={trendingGif.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

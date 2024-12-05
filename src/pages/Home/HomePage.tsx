import { IGif } from "@giphy/js-types";
import FilterParams from "../../components/FilterParams/FilterParams";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import useHomePageLogic from "./useHomePageLogic";
import Pagination from "../../components/Pagination/Pagination";
import Skeleton from "../../components/Skeleton/Skeleton";

const HomePage = () => {
  const { trendingGifs, page, setPage, isLoading } = useHomePageLogic();

  return (
    <div>
      <FilterParams />
      <Pagination page={page} setPage={setPage} />
      <div className="mt-3 columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {isLoading
          ? Array(10) // Same number as GIFs per page
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-32 w-full">
                  <Skeleton height="100%" baseColor="#e0e0e0" highlightColor="#f5f5f5" />
                </div>
              ))
          : trendingGifs.map((trendingGif: IGif) => (
          <GiphyListItem trendingGif={trendingGif} key={trendingGif.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

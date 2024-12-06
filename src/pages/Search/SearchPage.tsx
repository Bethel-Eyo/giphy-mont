import Skeleton from "react-loading-skeleton";
import FilterParams from "../../components/FilterParams/FilterParams";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import Pagination from "../../components/Pagination/Pagination";
import useSearchPageLogic from "./useSearchPageLogic";

const SearchPage = () => {
  const { searchResults, query, page, setPage, isLoading } = useSearchPageLogic();

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterParams />
      {isLoading ? (
        Array(10)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="h-32 w-full" data-testid="loading-skeleton">
              <Skeleton height="100%" baseColor="#e0e0e0" highlightColor="#f5f5f5" />
            </div>
          ))
      ) : searchResults.length > 0 ? (
        <div>
          <Pagination page={page} setPage={setPage} />
          <div className="mt-3 columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.map((trendingGif) => (
              <GiphyListItem trendingGif={trendingGif} key={trendingGif.id} />
            ))}
          </div>
        </div>
      ) : (
        <span>Did not find gifs for {query}</span>
      )}
    </div>
  );
};

export default SearchPage;

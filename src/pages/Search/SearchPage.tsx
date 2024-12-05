import FilterParams from "../../components/FilterParams/FilterParams";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import Pagination from "../../components/Pagination/Pagination";
import useSearchPageLogic from "./useSearchPageLogic";

const SearchPage = () => {
  const { searchResults, query, page, setPage } = useSearchPageLogic();

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterParams />
      {searchResults.length > 0 ? (
        <div>
          <Pagination page={page} setPage={setPage} />
          <div className="mt-3 columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.map((trendingGif) => (
              <GiphyListItem trendingGif={trendingGif} key={trendingGif.id} />
            ))}
          </div>
        </div>
      ) : (
        <span>Didn't find gifs for {query}</span>
      )}
    </div>
  );
};

export default SearchPage;

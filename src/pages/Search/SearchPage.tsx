import { useParams } from "react-router-dom";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { useEffect, useState } from "react";
import { IGif } from "@giphy/js-types";
import FilterParams from "../../components/FilterParams/FilterParams";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<IGif[]>([]);

  const { giphyFetch, filter } = useGiphyContext();

  const { query } = useParams();

  const getSearchResults = async () => {
    try {
      const { data } = await giphyFetch.search(query!, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      });

      setSearchResults(data);
    } catch (error) {
      console.debug("[getSearchResults] ", error);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterParams />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((trendingGif) => (
            <GiphyListItem trendingGif={trendingGif} key={trendingGif.id} />
          ))}
        </div>
      ) : (
        <span>Didn't find gifs for {query}</span>
      )}
    </div>
  );
};

export default SearchPage;

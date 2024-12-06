import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import Skeleton from "../../components/Skeleton/Skeleton";
import useFavoritesPageLogic from "./useFavoritesPageLogic";

const FavoritesPage = () => {
  const { savedGiphys, isLoading } = useFavoritesPageLogic();
  return (
    <div className="mt-2">
      {isLoading ? (
        <div className="h-32 w-full" data-testid="loading-favs">
          <Skeleton height="100%" baseColor="#e0e0e0" highlightColor="#f5f5f5" />
        </div>
      ) : (
        <div>
          <span className="faded-text ">
            {savedGiphys.length > 0 ? "My Favorites" : "No favorites found"}
          </span>
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
            {savedGiphys.map((gif) => (
              <GiphyListItem trendingGif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

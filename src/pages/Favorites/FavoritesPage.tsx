import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import useFavoritesPageLogic from "./useFavoritesPageLogic";

const FavoritesPage = () => {
  const { savedGiphys } = useFavoritesPageLogic();
  return (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {savedGiphys.map((gif) => (
          <GiphyListItem trendingGif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

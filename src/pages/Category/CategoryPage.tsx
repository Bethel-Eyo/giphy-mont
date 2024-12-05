import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import useCategoryPageLogic from "./useCategoryPageLogic";

const CategoryPage = () => {
  const {searchResults, category} = useCategoryPageLogic();

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {searchResults.length > 0 && <GiphyListItem trendingGif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">Communicate better in chats with gifs</span>
      </div>
      <div>
        {/* to avoid cases where a category with two words is separated with - instead of a space */}
        {category && (
          <h2 className="text-4xl pb-1 font-extrabold capitalize">
            {category.split("-").join(" & ")} GIFs
          </h2>
        )}
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {searchResults.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.slice(1).map((gif) => (
              <GiphyListItem trendingGif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

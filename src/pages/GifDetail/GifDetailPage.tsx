import { HiOutlineExternalLink } from "react-icons/hi";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import GiphyListItem from "../../components/GiphyListItem/GiphyListItem";
import useGifDetailPageLogic from "./useGifDetailPageLogic";

const GifDetailPage = () => {
  const { giphy, readMore, setReadMore, saveToFavorites, favorites } = useGifDetailPageLogic();

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {giphy?.user && (
          <>
            <div className="flex gap-1">
              <img src={giphy?.user?.avatar_url} alt={giphy?.user?.display_name} className="h-14" />
              <div className="px-2">
                <div className="font-bold">{giphy?.user?.display_name}</div>
                <div className="faded-text">@{giphy?.user?.username}</div>
              </div>
            </div>
            {giphy?.user?.about_bio && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore ? giphy?.user?.about_bio : giphy?.user?.about_bio.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        {giphy?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={giphy.source} target="_blank" className="truncate">
                {giphy.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{giphy?.title}</div>
            {giphy && <GiphyListItem trendingGif={giphy} hover={false} />}

            {/* For Mobile Screens */}
            <div className="flex sm:hidden gap-1">
              <img src={giphy?.user?.avatar_url} alt={giphy?.user?.display_name} className="h-14" />
              <div className="px-2">
                <div className="font-bold">{giphy?.user?.display_name}</div>
                <div className="faded-text">@{giphy?.user?.username}</div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            {giphy?.id && (
              <button
                onClick={() => saveToFavorites(giphy?.id)}
                className="flex gap-5 items-center font-bold text-lg"
              >
                <HiMiniHeart
                  size={30}
                  className={`transition-transform duration-300 ease-in-out ${
                    favorites.includes(giphy?.id) ? "text-red-500 scale-150" : "scale-100"
                  }`}
                />
                Favorite
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifDetailPage;

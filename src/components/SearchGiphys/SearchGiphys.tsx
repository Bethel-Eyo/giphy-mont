import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import useSearchGiphysLogic from "./useSearchGiphysLogic";

const SearchGiphys = () => {
  const { searchForGiphy, searchQuery, setSearchQuery, quitSearch } = useSearchGiphysLogic();

  return (
    <div className="flex relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="search for gifs and stickers"
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />

      {/* show close button when user has entered a search query */}
      {searchQuery && (
        <button
          onClick={quitSearch}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
          aria-label="close"
        >
          <HiMiniXMark size={22} />
        </button>
      )}
      <button
        onClick={searchForGiphy}
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
        aria-label="magnifying glass"
      >
        <HiOutlineMagnifyingGlass size={35} />
      </button>
    </div>
  );
};

export default SearchGiphys;

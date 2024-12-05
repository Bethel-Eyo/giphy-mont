import { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const SearchGiphys = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchForGiphy = async () => {
    // do nothing if the query is empty
    if (searchQuery.trim() === "") {
      return;
    }
    // navigate to search page
    navigate(`/search/${searchQuery}`);
  };

  const quitSearch = () => {
    setSearchQuery("");
    /**TODO: can still listen to if it is in the search route, before choosing to
     * navigate home
     */
    navigate("/");
  }

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
        >
          <HiMiniXMark size={22} />
        </button>
      )}
      <button
        onClick={searchForGiphy}
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} />
      </button>
    </div>
  );
};

export default SearchGiphys;

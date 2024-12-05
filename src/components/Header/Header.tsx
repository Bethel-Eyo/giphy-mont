import { ICategory } from "@giphy/js-fetch-api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import SearchGiphys from "../SearchGiphys/SearchGiphys";

const Header = () => {
  const { giphyFetch, favorites } = useGiphyContext();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showCategories, setShowCategories] = useState(false);

  const fetchGiphyCategories = async () => {
    try {
      const { data } = await giphyFetch.categories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGiphyCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to={"/"}>
          <h1 className="text-5xl font-bold tracking-tight cursor-pointe">GIPHY-MONT</h1>
        </Link>

        {/* Show first 5 categories on Menu List */}
        <div className="font-bold text-md flex gap-2 items-center">
          {categories?.slice(0, 5).map((category: ICategory) => {
            return (
              <Link
                className="px-4 py-1 transition ease-in-out hover:gradient border-b-4 hidden lg:block"
                key={category.name}
                to={`/${category.name_encoded}`}
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 transition ease-in-out hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 cursor-pointer hidden lg:block`}
            />
          </button>

          {/* Show Favourites only when user has favourites */}
          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}

          {/* For Mobile Screens */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight className="text-sky-400 block lg:hidden" size={30} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {/* TODO: Refactor for Abstraction */}
        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => {
                return (
                  <Link
                    onClick={() => setShowCategories(false)}
                    className="transition ease-in-out font-bold"
                    key={category.name}
                    to={`/${category.name_encoded}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <SearchGiphys />
    </nav>
  );
};

export default Header;

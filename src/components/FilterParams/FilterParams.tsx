import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";
import { MediaType } from "@giphy/js-fetch-api";

interface FilterParamProps {
  title: string;
  value: MediaType;
  background: string;
}
const params: FilterParamProps[] = [
  {
    title: "GIFs",
    value: "gifs",
    background: "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterParams = () => {
  const { filter, setFilter } = useGiphyContext();
  return (
    <div className="flex my-3 gap-3 flex-col sm:flex-row sm:items-center justify-between">
      <span className="flex gap-2">
        <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
        <span className="font-semibold text-gray-400">Trending</span>
      </span>
      <div className="flex min-w-80 rounded-full bg-gray-800">
        {params.map((param: FilterParamProps) => {
          return (
            <span
              onClick={() => setFilter(param.value)}
              className={`${
                filter === param.value ? param.background : ""
              } font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer `}
              key={param.title}
            >
              {param.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterParams;

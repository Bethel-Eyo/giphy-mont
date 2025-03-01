import { IGif } from "@giphy/js-types";
import { FC } from "react";
import { Link } from "react-router-dom";

interface GiphyItemProps {
  trendingGif: IGif;
  hover?: boolean;
}

const GiphyListItem: FC<GiphyItemProps> = ({ trendingGif, hover = true }) => {
  return (
    <Link to={`/${trendingGif.type}s/${trendingGif.slug}`} key={trendingGif.id}>
      <div className="w-full aspect-video mb-2 relative bg-png-pattern cursor-pointer group">
        <img
          src={trendingGif?.images?.fixed_width.webp}
          alt={trendingGif?.title}
          className="w-full object-cover rounded transition-all duration-300"
          data-testid="gif-image"
        />
        {hover && (
          <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2">
            <img
              src={trendingGif?.user?.avatar_url}
              alt={trendingGif?.user?.display_name}
              className="h-8"
            />
            <span>{trendingGif?.user?.display_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default GiphyListItem;

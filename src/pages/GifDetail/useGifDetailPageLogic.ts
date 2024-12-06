import { IGif } from "@giphy/js-types";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGiphyContext } from "../../contexts/Giphy/useGiphyContext";

const giphyType = ["gifs", "stickers", "texts"];

const useGifDetailPageLogic = () => {
  const { type, slug } = useParams();
  const [giphy, setGiphy] = useState<IGif>();
  const [readMore, setReadMore] = useState(false);

  const { giphyFetch, saveToFavorites, favorites } = useGiphyContext();

  const getSingleGiphy = useCallback(async () => {
    if (slug) {
      try {
        const giphyId = slug.split("-");
        const { data } = await giphyFetch.gif(giphyId[giphyId.length - 1]);
        setGiphy(data);
      } catch (error) {
        console.debug("[GifDetailPage] getSingleGiphy", error);
      }
    }
  }, [giphyFetch, slug]);

  useEffect(() => {
    if (!type || !giphyType.includes(type)) {
      throw new Error("Invalid Content Type");
    }

    getSingleGiphy();
  }, [getSingleGiphy, type]);

  return useMemo(
    () => ({ giphy, readMore, setReadMore, saveToFavorites, favorites, getSingleGiphy }),
    [giphy, readMore, setReadMore, saveToFavorites, favorites, getSingleGiphy]
  );
};

export default useGifDetailPageLogic;

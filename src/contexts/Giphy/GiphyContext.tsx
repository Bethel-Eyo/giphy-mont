import { GiphyFetch, MediaType } from "@giphy/js-fetch-api";
import { GifID, IGif } from "@giphy/js-types";
import { createContext } from "react";

interface GiphyContextType {
    giphyFetch: GiphyFetch;
    trendingGifs: IGif[];
    setTrendingGifs: React.Dispatch<React.SetStateAction<IGif[]>>;
    favorites: GifID[];
    filter: MediaType | undefined;
    setFilter: React.Dispatch<React.SetStateAction<MediaType>>;
    saveToFavorites: (id: GifID) => void;
}

export const GiphyContext = createContext<GiphyContextType | null>(null);



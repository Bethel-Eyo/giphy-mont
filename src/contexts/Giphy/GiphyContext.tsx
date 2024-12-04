import { GiphyFetch, MediaType } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import { createContext } from "react";

interface GiphyContextType {
    giphyFetch: GiphyFetch;
    trendingGifs: IGif[];
    setTrendingGifs: React.Dispatch<React.SetStateAction<IGif[]>>;
    favorites: IGif[];
    filter: MediaType | undefined;
    setFilter: React.Dispatch<React.SetStateAction<MediaType>>;
}

export const GiphyContext = createContext<GiphyContextType | null>(null);



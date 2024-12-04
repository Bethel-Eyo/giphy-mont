import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import { createContext } from "react";

interface GiphyContextType {
    giphyFetch: GiphyFetch;
    trendingGifs: IGif[];
    setTrendingGifs: React.Dispatch<React.SetStateAction<IGif[]>>;
    favorites: IGif[];
}

export const GiphyContext = createContext<GiphyContextType | null>(null);



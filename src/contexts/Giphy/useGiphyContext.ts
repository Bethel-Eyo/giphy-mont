import { useContext } from "react";
import { GiphyContext } from "./GiphyContext";

export const useGiphyContext = () => {
  const context = useContext(GiphyContext);
  if (!context) {
    throw new Error("useGiphyContext must be used within a GiphyProvider");
  }
  return context;
};

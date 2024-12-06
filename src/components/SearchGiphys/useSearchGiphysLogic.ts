import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useSearchGiphysLogic = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchForGiphy = useCallback(async () => {
    // do nothing if the query is empty
    if (searchQuery.trim() === "") {
      return;
    }
    // navigate to search page
    navigate(`/search/${searchQuery}`);
  }, [navigate, searchQuery]);

  const quitSearch = useCallback(() => {
    setSearchQuery("");
    navigate("/");
  }, [navigate]);

  return useMemo(
    () => ({ searchForGiphy, quitSearch, searchQuery, setSearchQuery }),
    [searchForGiphy, quitSearch, searchQuery, setSearchQuery]
  );
};

export default useSearchGiphysLogic;

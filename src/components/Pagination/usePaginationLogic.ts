import { useCallback, useMemo } from "react";

const usePaginationLogic = (setPage: React.Dispatch<React.SetStateAction<number>>) => {
  const nextPage = useCallback(() => setPage((prevPage) => prevPage + 1), [setPage]);
  const prevPage = useCallback(() => setPage((prevPage) => Math.max(0, prevPage - 1)), [setPage]);

  return useMemo(() => ({ nextPage, prevPage }), [nextPage, prevPage]);
};

export default usePaginationLogic;

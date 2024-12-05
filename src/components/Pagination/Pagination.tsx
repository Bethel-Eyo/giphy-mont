import { FC } from "react";
import usePaginationLogic from "./usePaginationLogic";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination: FC<PaginationProps> = ({ page, setPage }) => {
  const { prevPage, nextPage } = usePaginationLogic(setPage);
  
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={prevPage}
        disabled={page === 0}
        className={`px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-200 ${
          page === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>
      <span className="text-sm font-medium text-gray-600">Page {page + 1}</span>
      <button
        onClick={nextPage}
        className="px-4 py-2 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white transition duration-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

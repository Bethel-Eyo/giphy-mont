import { renderHook, act } from "@testing-library/react";
import usePaginationLogic from "./usePaginationLogic";
import { describe, test, expect, vi } from "vitest";

describe("usePaginationLogic tests", () => {
  test("when nextPage is called, setPage function should be called", () => {
    const setPage = vi.fn(); // mock the setPage function
    const { result } = renderHook(() => usePaginationLogic(setPage));

    act(() => {
      result.current.nextPage();
    });

    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
  });

  test("when prevPage is called, setPage function should be called", () => {
    const setPage = vi.fn(); // mock the setPage function
    const { result } = renderHook(() => usePaginationLogic(setPage));

    setPage(1);

    act(() => {
      result.current.prevPage();
    });

    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
  });

  test("should return nextPage and prevPage as part of the returned object", () => {
    const setPage = (newPage: React.SetStateAction<number>) => {
      if (typeof newPage === "function") {
        return newPage(0);
      }
      return newPage;
    };

    const { result } = renderHook(() => usePaginationLogic(setPage));

    // Check if nextPage and prevPage are available
    expect(result.current.nextPage).toBeInstanceOf(Function);
    expect(result.current.prevPage).toBeInstanceOf(Function);
  });
});

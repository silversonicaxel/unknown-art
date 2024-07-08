import { renderHook } from '@testing-library/react'
import { expect, it, describe } from "vitest"

import { usePagination } from "./usePagination"


describe('Helpers > Hooks > usePagination', () => {
  it('should return a restricted range of pages from early current page', () => {
    const data = {
      itemsPerPage: 10,
      maxPaginators: 7,
      totalItems: 17,
      currentPage: 1,
    }

    const { result } = renderHook(() => usePagination(data))

    expect(result.current.startPage).toBe(1)
    expect(result.current.endPage).toBe(2)
    expect(result.current.rangePages).toEqual([1,2])
  })

  it('should return a restricted range of pages from later current page', () => {
    const data = {
      itemsPerPage: 10,
      maxPaginators: 7,
      totalItems: 17,
      currentPage: 2,
    }

    const { result } = renderHook(() => usePagination(data))

    expect(result.current.startPage).toBe(1)
    expect(result.current.endPage).toBe(2)
    expect(result.current.rangePages).toEqual([1,2])
  })

  it('should return a full range of pages from early current page', () => {
    const data = {
      itemsPerPage: 10,
      maxPaginators: 5,
      totalItems: 66,
      currentPage: 1,
    }

    const { result } = renderHook(() => usePagination(data))

    expect(result.current.startPage).toBe(1)
    expect(result.current.endPage).toBe(5)
    expect(result.current.rangePages).toEqual([1,2,3,4,5])
  })

  it('should return a full range of pages from later current page', () => {
    const data = {
      itemsPerPage: 10,
      maxPaginators: 5,
      totalItems: 66,
      currentPage: 7,
    }

    const { result } = renderHook(() => usePagination(data))

    expect(result.current.startPage).toBe(3)
    expect(result.current.endPage).toBe(7)
    expect(result.current.rangePages).toEqual([3,4,5,6,7])
  })

  it('should return a full range of pages from central current page', () => {
    const data = {
      itemsPerPage: 10,
      maxPaginators: 5,
      totalItems: 66,
      currentPage: 4,
    }

    const { result } = renderHook(() => usePagination(data))

    expect(result.current.startPage).toBe(2)
    expect(result.current.endPage).toBe(6)
    expect(result.current.rangePages).toEqual([2,3,4,5,6])
  })
})

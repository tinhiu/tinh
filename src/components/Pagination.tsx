import Link from 'next/link'
import React from 'react'
import usePagination from '../hooks/usePagination'

export type PaginationProps = {
  totalItems: number
  currentPage: number
  renderPageLink: (page: number) => string
  itemsPerPage?: number
}

export const dotts = '...'

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  renderPageLink,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)
  
  return (
    <div className="my-8 mt-32 flex items-center justify-center">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="rounded-full px-4 py-2 text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link key={i} href={renderPageLink(pageNumber as number)}>
            <a
              key={i}
              className={`${pageNumber == currentPage ? 'text-black  dark:text-gray-600' : ' text-gray-400  dark:text-white'
                } mx-1 rounded-full px-4 py-2 text-sm font-semibold  no-underline hover:bg-amber-100 dark:hover:bg-indigo-500`}
            >
              {pageNumber}
            </a>
          </Link>
        )
      )}
    </div>
  )
}

export default Pagination

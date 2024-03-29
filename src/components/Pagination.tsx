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
	if (currentPage > Math.ceil(totalItems / itemsPerPage)) {
		return <span className='my-5 flex items-center justify-center text-sm italic'>
			There is no page {currentPage} please go
			<Link href={'/music2'} scroll={true}>
				<a className="ml-1 font-semibold text-slate-800 underline dark:text-amber-200">
					back
				</a>
			</Link>
		</span>
	}
	return (
		<div className="my-8 mt-12 flex items-center justify-center">
			{pages.map((pageNumber, i) =>
				pageNumber === dotts ? (
					<span
						key={i}
						className="rounded-full px-4 py-2 text-sm font-semibold text-gray-400 dark:text-white/60"
					>
						{pageNumber}
					</span>
				) : (
					<Link key={i} href={renderPageLink(pageNumber as number)} scroll={false}>
						<a
							key={i}
							className={`${pageNumber == currentPage
								? ' text-zinc-800 dark:text-amber-200'
								: ' text-gray-400  dark:text-white/60'}
                mx-1 rounded-full px-4 pb-2 pt-[0.7rem] text-sm font-semibold leading-none
                no-underline hover:bg-white/70 dark:hover:dark:bg-[#5f5555ad]/40`}
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
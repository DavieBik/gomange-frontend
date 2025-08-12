// components/ui/Pagination.tsx

'use client'

import { useState } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      if (currentPage > 3) pages.push(-1) // Representa "..."
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 1) pages.push(-1)
      if (totalPages > 1) pages.push(totalPages)
    }

    return pages
  }

  const handlePageClick = (page: number | null) => {
    if (!page || page === currentPage || page < 1 || page > totalPages) return
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="inline-flex space-x-1">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        &laquo;
      </button>

      {pageNumbers.map((page, index) =>
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded-md transition-colors ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        &raquo;
      </button>
    </nav>
  )
}
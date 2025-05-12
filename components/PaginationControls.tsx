"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PaginationControls({
  currentPage,
  totalItems,
  itemsPerPage,
}: {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}) {
  const pathname = usePathname();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  // Adjust if we're at the beginning
  if (currentPage === 1) {
    endPage = Math.min(3, totalPages);
  }

  // Adjust if we're at the end
  if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  // Generate the array
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages === 1) {
    return <></>;
  }

  return (
    <div className="product__pagination">
      {/* Previous Button */}
      {hasPrev && (
        <Link href={`${pathname}?page=${currentPage - 1}`}>
          <i className="fa fa-long-arrow-left"></i>
        </Link>
      )}

      {pageNumbers.map((number) => (
        <Link
          className={number === currentPage ? "active" : ""}
          key={number}
          href={`${pathname}?page=${number}`}
        >
          {number}
        </Link>
      ))}

      {/* Next Button */}
      {hasNext && (
        <Link href={`${pathname}?page=${currentPage + 1}`}>
          <i className="fa fa-long-arrow-right"></i>
        </Link>
      )}
    </div>
  );
}

'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { PaginationProps } from './type';
import './pagination.css';

const Pagination = ({ currentPage, allPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  if (allPages <= 1) return null;

  const handleClick = (page: number) => {
    const searchParams = new URLSearchParams(params.toString());

    searchParams.set('page', String(page));
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: allPages }, (_, i) => i + 1);

  return (
    <div className="pagination" data-testid="pagination">
      {pages.map((page) => (
        <a
          key={page}
          data-testid="page"
          href="#"
          className={page === currentPage ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault();
            handleClick(page);
          }}
        >
          {page}
        </a>
      ))}
    </div>
  );
};

export default Pagination;

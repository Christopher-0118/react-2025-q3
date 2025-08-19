'use client';
import { useSearchParams } from 'next/navigation';
import type { PaginationProps } from './type';
import './pagination.css';
import { usePathname, Link } from '@/i18n/navigation';

const Pagination = ({ currentPage, allPages }: PaginationProps) => {
  const pathname = usePathname();
  const params = useSearchParams();

  if (allPages <= 1) return null;

  const handleClick = (page: number) => {
    const searchParams = new URLSearchParams(params.toString());

    searchParams.set('page', String(page));
    return `${pathname}?${searchParams.toString()}`;
  };

  const pages = Array.from({ length: allPages }, (_, i) => i + 1);

  return (
    <div className="pagination" data-testid="pagination">
      {pages.map((page) => (
        <Link
          key={page}
          href={handleClick(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;

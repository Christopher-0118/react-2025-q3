import { useNavigate, useLocation } from 'react-router-dom';
import type { PaginationProps } from '../../type';
import './pagination.css';

const Pagination = ({ currentPage, allPages }: PaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (allPages <= 1) return null;

  const handleClick = (page: number) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('page', String(page));
    navigate(`${location.pathname}?${searchParams.toString()}`);
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
          onClick={(e) => {
            e.preventDefault();
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

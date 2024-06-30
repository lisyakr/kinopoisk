import { useMainPageContext } from '../../context/MainPageContext';
import { Pagination as PaginationMUI } from '@mui/material';

export const Pagination = () => {
    const {currentPage, setCurrentPage, pagesCount} = useMainPageContext();

    return pagesCount ? (
        <div className="pagination">
            <PaginationMUI count={pagesCount} page={currentPage} onChange={(e, page) => setCurrentPage(page)} variant="outlined" />
        </div>
    ) : null;
};

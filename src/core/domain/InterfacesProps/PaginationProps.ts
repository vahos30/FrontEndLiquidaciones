export interface PaginationProps {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    onGoToPage: (page: number) => void;
}
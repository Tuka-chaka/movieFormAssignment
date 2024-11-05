'useClient'

import styles from './Pagination.module.css'
import localFont from 'next/font/local';
import {Inter_Tight} from 'next/font/google'
import ReactPaginate from 'react-paginate';

const interTight = Inter_Tight({
    subsets: ['cyrillic'],
    weight: ['400'],
})

const satoshi = localFont({
    src: '../../app/fonts/Satoshi-regular.ttf'
})

const paginationIcon = <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 9C0.447715 9 4.82823e-08 8.55228 0 8C-4.82823e-08 7.44772 0.447715 7 1 7L1 9ZM14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L8.34315 15.0711C7.95262 15.4616 7.31946 15.4616 6.92893 15.0711C6.53841 14.6805 6.53841 14.0474 6.92893 13.6569L12.5858 8L6.92893 2.34315C6.53841 1.95262 6.53841 1.31946 6.92893 0.928932C7.31946 0.538407 7.95262 0.538407 8.34315 0.928932L14.7071 7.29289ZM1 7L14 7L14 9L1 9L1 7Z" fill="#121212"/>
</svg>


interface PaginationProps {
    pageCount: number
    currentPage: number
    onPageChange: (page: number) => void
  }

const Pagination = ({pageCount, currentPage, onPageChange} : PaginationProps) => {

    const handleClick = (page: number | undefined ) => {

        if (page === undefined) {
            return false
        }

        if (page < currentPage - 1) {
            onPageChange(page + 1)
        }

        else {
            return false
        }
    } 

  return(
    <ReactPaginate
    forcePage={currentPage - 1}
    breakLabel="..."
    nextLabel={paginationIcon}
    previousLabel={paginationIcon}
    pageCount={pageCount}
    pageRangeDisplayed={1}
    marginPagesDisplayed={2}
    containerClassName={`${styles.paginationWrapper} ${interTight.className}`}
    nextClassName={styles.pageMarker}
    previousClassName={`${styles.pageMarker} ${styles.previous}`}
    pageClassName={styles.pageMarker}
    breakClassName={`${styles.pageMarker} ${satoshi.className}`}
    activeClassName={styles.current}
    disabledClassName={styles.disabled}
    renderOnZeroPageCount={null}
    disableInitialCallback={true}
    pageLabelBuilder={(page) => {
        if ((page === currentPage + pageCount - 2 && page !== pageCount)
            || ((page === currentPage - pageCount + 2 && page !== 1)) ) {
            return <span className={satoshi.className}>...</span>
        }
        return page
    }}
    onClick={(e) => handleClick(e.nextSelectedPage)}
    />
  ) ;
};

export default Pagination;

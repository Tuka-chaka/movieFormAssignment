import styles from './Pagination.module.css'
import localFont from 'next/font/local';
import {Inter_Tight} from 'next/font/google'

const interTight = Inter_Tight({
    subsets: ['cyrillic'],
    weight: ['400'],
})

const satoshi = localFont({
    src: '../../app/fonts/Satoshi-regular.ttf'
})

const Pagination = () => {
  return(
    <div className={`${styles.paginationWrapper} ${interTight.className}`}>
        <div className={`${styles.pageMarker} ${styles.current}`}>1</div>
        <div className={`${styles.pageMarker}`}>2</div>
        <div className={`${styles.pageMarker} ${satoshi.className}`}>...</div>
        <div className={`${styles.pageMarker}`}>4</div>
        <div className={`${styles.pageMarker}`}>
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9C0.447715 9 4.82823e-08 8.55228 0 8C-4.82823e-08 7.44772 0.447715 7 1 7L1 9ZM14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L8.34315 15.0711C7.95262 15.4616 7.31946 15.4616 6.92893 15.0711C6.53841 14.6805 6.53841 14.0474 6.92893 13.6569L12.5858 8L6.92893 2.34315C6.53841 1.95262 6.53841 1.31946 6.92893 0.928932C7.31946 0.538407 7.95262 0.538407 8.34315 0.928932L14.7071 7.29289ZM1 7L14 7L14 9L1 9L1 7Z" fill="#121212"/>
        </svg>
        </div>
    </div>
  ) ;
};

export default Pagination;

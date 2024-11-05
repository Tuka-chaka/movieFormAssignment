'use client'

import Pagination from '../pagination/Pagination';
import styles from './StepPlaceholder.module.css'
import { Inter_Tight } from "next/font/google";
import { useRouter, useSearchParams } from 'next/navigation'

const interTight = Inter_Tight({
    subsets: ['cyrillic'],
    weight: ['600'],
})


const StepPlaceholder = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('step') ?? '2')

  return (
    <div className={styles.layout}>
        <h1 className={`${styles.heading} ${interTight.className}`}>
            Этого шага пока не существует
        </h1>

        <p className={`${styles.info} ${interTight.className}`}>
            Данные сохранились! Для проверки перейдите на предыдущий шаг и обновите страницу, пагинатор работает
        </p>

        <Pagination onPageChange={(page) => router.push(`/?step=${page}`)} pageCount={4} currentPage={page}/>
    </div>
  );
};

export default StepPlaceholder;

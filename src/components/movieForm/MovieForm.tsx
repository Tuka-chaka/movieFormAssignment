'use client'

import Dropdown from '../dropdown/Dropdown';
import FormInput from '../formInput/FormInput';
import Pagination from '../pagination/Pagination';
import styles from './MovieForm.module.css'
import {Inter_Tight} from 'next/font/google'
import localFont from 'next/font/local';
import { useState } from 'react';

const interTight = Inter_Tight({
    subsets: ['cyrillic'],
    weight: ['600'],
})

const helvetica = localFont({
    src: '../../app/fonts/Helvetica.ttf'
})

const helveticaNeue = localFont({
    src: '../../app/fonts/HelveticaNeueCyr-Roman.ttf'
})

const genreOptions = [
    'Артхаус',
    'Мюзикл',
    'Роуд-муви',
    'Мокьюментари',
    'Неонуар'
]

const formatOptions = [
    'Онлайн-платформа',
    'Большой экран',
    'Интернет',
    'Другое'
]

const countryOptions = [
    'Россия',
    'Лихтенштейн',
    'Тринидад и Тобаго',
    'Уругвай'
]

const MovieForm = () => {

    const [formdata, setFormData] = useState({
        name: "",
        genre: "",
        format: "",
        movieId: "",
        country: "",
        price: "",
        description: ""
    })
  return (
    <form className={styles.form}>
        <div className={styles.formHeader}>
            <h1 className={`${styles.formName} ${interTight.className}`}>
                Производственные параметры фильма
            </h1>
            <button type='reset' className={`${styles.button} ${styles.abortButton} ${helvetica.className}`}>
                Отменить заполнение
            </button>
        </div>
        <div className={`${styles.formContent} ${helveticaNeue.className}`}>
            <div className={styles.leftColumn}>
                <FormInput pattern='\w+' label='Название проекта' placeholder='Название' isRequired/>
                <Dropdown label='Жанр' placeholder='Жанр' options={genreOptions} isRequired/>
                <Dropdown label='Формат (для онлайн-платформ, большого экрана, интернета, другое)' placeholder='Формат' options={formatOptions} isRequired/>
                <FormInput pattern='\d{3}-\d{3}-\d{3}-\d{2}-\d{3}' label='№ УНФ или отсутствует ' placeholder='890-000-000-00-000'/>
            </div>
            <div className={styles.rightColumn}>
                <Dropdown label='Страна-производитель (копродукция)' placeholder='Страна' options={countryOptions} isRequired/>
                <FormInput pattern='\d+' label='Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть' placeholder='Сметная стоимость'/>
                <FormInput label='Синопсис' placeholder='Напишите краткое изложение' isLong/>
            </div>
        </div>
        <div className={styles.formFooter}>
            <div className={styles.spacer}></div>
            <Pagination/>
            <button disabled className={`${styles.button} ${styles.proceedButton}`}>Следующий шаг</button>
        </div>
    </form>
  );
};

export default MovieForm;

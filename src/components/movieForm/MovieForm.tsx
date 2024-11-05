'use client'

import Dropdown from '../dropdown/Dropdown';
import FormInput from '../formInput/FormInput';
import Pagination from '../pagination/Pagination';
import styles from './MovieForm.module.css'
import {Inter_Tight} from 'next/font/google'
import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';

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

    const formRef = useRef<HTMLFormElement>(null)

    const[isInvalid, setIsInvalid] = useState(true)

    const [formData, setFormData] = useState({
        movieName: "",
        genre: "",
        format: "",
        movieId: "",
        country: "",
        price: "",
        description: ""
    })

    const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setFormData({
            movieName: "",
            genre: "",
            format: "",
            movieId: "",
            country: "",
            price: "",
            description: ""
        })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        localStorage.setItem('formData', JSON.stringify(formData))
        alert('Данные сохранены, для проверки обновите страницу')
    }

    useEffect(() => {
        setIsInvalid(!formRef.current?.checkValidity())
    }, [formData])

    useEffect(() => {
        const retrievedFormData = JSON.parse(localStorage.getItem('formData') || '{}')
        if (retrievedFormData) {
            setFormData(retrievedFormData)
        }
    }, [])

    return (
    <form ref={formRef} className={styles.form}>
        <div className={styles.formHeader}>
            <h1 className={`${styles.formName} ${interTight.className}`}>
                Производственные параметры фильма
            </h1>
            <button type='reset' onClick={(e) => handleReset(e)} className={`${styles.button} ${styles.abortButton} ${helvetica.className}`}>
                Отменить заполнение
            </button>
        </div>
        <div className={`${styles.formContent} ${helveticaNeue.className}`}>
            <div className={styles.leftColumn}>
                <FormInput value={formData.movieName} onChange={(value) => setFormData((formdata) => ({...formdata, movieName:value}))} label='Название проекта' placeholder='Название' isRequired/>
                <Dropdown value={formData.genre} onChange={(value) => setFormData((formdata) => ({...formdata, genre:value}))} label='Жанр' placeholder='Жанр' options={genreOptions} isRequired/>
                <Dropdown value={formData.format} onChange={(value) => setFormData((formdata) => ({...formdata, format:value}))} label='Формат (для онлайн-платформ, большого экрана, интернета, другое)' placeholder='Формат' options={formatOptions} isRequired/>
                <FormInput value={formData.movieId} onChange={(value) => setFormData((formdata) => ({...formdata, movieId:value}))}  pattern='\d{3}-\d{3}-\d{3}-\d{2}-\d{3}' label='№ УНФ или отсутствует' placeholder='890-000-000-00-000'/>
            </div>
            <div className={styles.rightColumn}>
                <Dropdown value={formData.country} onChange={(value) => setFormData((formdata) => ({...formdata, country:value}))} label='Страна-производитель (копродукция)' placeholder='Страна' options={countryOptions} isRequired/>
                <FormInput value={formData.price} onChange={(value) => setFormData((formdata) => ({...formdata, price:value}))} pattern='\d+' label='Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть' placeholder='Сметная стоимость'/>
                <FormInput value={formData.description} onChange={(value) => setFormData((formdata) => ({...formdata, description:value}))} label='Синопсис' placeholder='Напишите краткое изложение' isLong/>
            </div>
        </div>
        <div className={styles.formFooter}>
            <div className={styles.spacer}></div>
            <Pagination/>
            <button onClick={(e) => handleSubmit(e)} disabled={isInvalid} className={`${styles.button} ${styles.proceedButton} ${helvetica.className}`}>
                <span>Следующий шаг</span>
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.13385 7.99999L17.2294 7.99999M17.2294 7.99999L10.3313 1.11252M17.2294 7.99999L10.3313 14.8875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    </form>
  );
};

export default MovieForm;

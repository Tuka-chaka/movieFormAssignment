'use client'

import Dropdown from '../dropdown/Dropdown';
import FormInput from '../formInput/FormInput';
import Pagination from '../pagination/Pagination';
import styles from './MovieForm.module.css'
import {Inter_Tight} from 'next/font/google'
import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { countryOptions } from '../../exports'
import FormButton from '../button/FormButton';

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

const interTight = Inter_Tight({
    subsets: ['cyrillic'],
    weight: ['600'],
})

const helveticaNeue = localFont({
    src: '../../app/fonts/HelveticaNeueCyr-Roman.ttf'
})

const MovieForm = () => {

    const router = useRouter()

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
        console.log(formData)
        router.push(`/?step=${2}`)
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
            <FormButton type='reset' onClick={(e) => handleReset(e)} label='Отменить заполнение'/>
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
            <Pagination onPageChange={(page) => console.log(page)} pageCount={4} currentPage={1}/>
            <FormButton type='submit' onClick={(e) => handleSubmit(e)} disabled={isInvalid} label='Следующий шаг'/>
        </div>
    </form>
  );
};

export default MovieForm;

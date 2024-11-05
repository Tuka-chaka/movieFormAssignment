import styles from './FormButton.module.css'
import localFont from 'next/font/local';


const helvetica = localFont({
    src: '../../app/fonts/Helvetica.ttf'
})

interface ButtonProps {
    type: string
    label: string
    disabled?: boolean
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const FormButton = ({type, onClick, label, disabled = false}: ButtonProps) => {

    if (type === 'reset')
        return (
        <button type='reset' onClick={(e) => onClick(e)} className={`${styles.button} ${styles.abortButton} ${helvetica.className}`}>
            {label}
        </button>);

    else if (type ==='submit')
        return (
        <button onClick={(e) => onClick(e)} disabled={disabled} className={`${styles.button} ${styles.proceedButton} ${helvetica.className}`}>
            <span>{label}</span>
            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.13385 7.99999L17.2294 7.99999M17.2294 7.99999L10.3313 1.11252M17.2294 7.99999L10.3313 14.8875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>)
    else return (
        <div>Invalid button type</div>
    )
};

export default FormButton;

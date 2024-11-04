import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './FormInput.module.css'

interface FormInputProps {
  label: string
  placeholder: string
  isRequired?: boolean
  isLong?: boolean
  pattern?: string
  value: string
  onChange: (value:string) => void
}

const FormInput = ({value, onChange, label, placeholder, isRequired = false, isLong = false, pattern=".+"} : FormInputProps) => {

  const [isInvalid, setIsInvalid] = useState(true)
  const [interacted, setInteracted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalid(!inputRef.current!.checkValidity())
    onChange(e.target.value)
  }

  const handleFocus = () => {
    setInteracted(true)
    setIsFocused(true)
  }

  useEffect(() => {
    setIsInvalid(!inputRef.current?.checkValidity())
  }, [value])

  return(
  <div className={styles.inputWrapper}>
    <label className={styles.label}>{label}</label>
    {!isLong ? <input value={value} onFocus={() => handleFocus()} onBlur={() => setIsFocused(false)} onChange={(e) => handleChange(e)} ref={inputRef} pattern={pattern} className={`${styles.input} ${interacted && !isFocused ? styles.interacted : ''}`} required={isRequired} type='text' placeholder={placeholder}>
    </input> : <textarea onChange={(e) => onChange(e.target.value)} value={value} className={`${styles.input} ${styles.long}`} required={isRequired} placeholder={placeholder}>
    </textarea>}
    <span className={`${styles.invalidMarker} ${ isInvalid && interacted && !isFocused ? styles.visible : ''}`}>{isRequired ? 'Заполните поле' : 'Неверный формат'}</span>
  </div>
  );
};

export default FormInput;

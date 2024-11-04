import { useRef, useState } from 'react'
import styles from './FormInput.module.css'

interface FormInputProps {
  label: string
  placeholder: string
  isRequired?: boolean
  isLong?: boolean
  pattern?: string
}

const FormInput = ({label, placeholder, isRequired = false, isLong = false, pattern=""} : FormInputProps) => {

  const [isInvalid, setIsInvalid] = useState(true)
  const [interacted, setInteracted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    setIsInvalid(!inputRef.current!.checkValidity())
  }

  const handleFocus = () => {
    setInteracted(true)
    setIsFocused(true)
  }

  return(
  <div className={styles.inputWrapper}>
    <label className={styles.label}>{label}</label>
    {!isLong ? <input onFocus={() => handleFocus()} onBlur={() => setIsFocused(false)} onChange={() => handleChange()} ref={inputRef} pattern={pattern} className={`${styles.input} ${interacted ? styles.interacted : ''}`} required={isRequired} type='text' placeholder={placeholder}>
    </input> : <textarea className={`${styles.input} ${styles.long}`} required={isRequired} placeholder={placeholder}>
    </textarea>}
    {isRequired && isInvalid && interacted && !isFocused && <span className={styles.invalidMarker}>Заполните поле</span>}
  </div>
  );
};

export default FormInput;

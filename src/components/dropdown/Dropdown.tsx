import styles from './Dropdown.module.css'
import {useState, useRef, useEffect} from 'react'

interface DropdownProps {
  label: string
  placeholder: string
  isRequired: boolean
  options: Array<string>
  value: string
  onChange: (value:string) => void
}

const Dropdown = ({label, placeholder, isRequired, options, value, onChange} : DropdownProps) => {

    const [isInvalid, setIsInvalid] = useState(true)
    const [interacted, setInteracted] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLSelectElement>(null)
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <select ref={inputRef} onFocus={() => handleFocus()} onBlur={() => setIsFocused(false)} onChange={(e) => handleChange(e)} value={value} className={`${styles.select} ${interacted && !isFocused ? styles.interacted : ''}`} required={isRequired}>
        <option value="" disabled hidden>{placeholder}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
    <span className={`${styles.invalidMarker} ${isRequired && isInvalid && interacted && !isFocused ? styles.visible : ''}`}>Заполните поле</span>
  </div>
  );
};

export default Dropdown;

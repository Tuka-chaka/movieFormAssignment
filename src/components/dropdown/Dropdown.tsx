import styles from './Dropdown.module.css'
import {useState, useRef} from 'react'

interface DropdownProps {
  label: string
  placeholder: string
  isRequired: boolean
  options: Array<string>
}

const Dropdown = ({label, placeholder, isRequired, options} : DropdownProps) => {

    const [isInvalid, setIsInvalid] = useState(true)
    const [interacted, setInteracted] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLSelectElement>(null)
  
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
    <select ref={inputRef} onFocus={() => handleFocus()} onBlur={() => setIsFocused(false)} onChange={() => handleChange()} defaultValue="" className={`${styles.select} ${interacted ? styles.interacted : ''}`} required={isRequired}>
        <option value="" disabled hidden>{placeholder}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
    {isRequired && isInvalid && interacted && !isFocused && <span className={styles.invalidMarker}>Заполните поле</span>}
  </div>
  );
};

export default Dropdown;

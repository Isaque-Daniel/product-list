import styles from './Select.module.css'

function Select({text, name, options, value, handleOnChange}){
    return(
        <div className={styles.select_control}>
            <select onChange={handleOnChange} value={value||'default'} id={name} name={name}>
                <option disabled hidden value='default'>{text}</option>
                {
                    options.map((option)=>(
                        <option id={name} value={option.id} key={option.id}>{option.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select;
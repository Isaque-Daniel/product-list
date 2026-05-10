import styles from './Message.module.css'
import {useState, useEffect} from 'react'

function Message({ type, txt, clearMessage }){

    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        if(!txt){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(()=>{
            setVisible(false)
            clearMessage()
        }, 3000)

        return ()=>clearTimeout(timer)

    }, [txt])
    
    return(
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{txt}</div>
            )}
        </>
    )
}

export default Message;
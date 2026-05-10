import styles from './Loader.module.css'

import loading from '../../img/loading.svg'

function Loading(){
    return(
            <div className={styles.loader_contaier}>
                <img className={styles.loader} src={loading} alt="loading"/>
            </div>
    )
}

export default Loading;
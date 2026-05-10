import styles from "./Frase.module.css"

function Frase(){
    return (
        <div className={styles.fraseContainer}>
            <p className={styles.fraseContent}>Esse é um componente com uma frase... e só isso!</p>
            <p className={styles.fraseContent}>Eu menti, tem mais coisa sim!</p>
        </div>
    )
}

export default Frase;
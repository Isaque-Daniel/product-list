import { Link } from "react-router-dom";
import styles from '../NavBar.module.css'

function NavBar(){
    return (
        <>
            <ul className={styles.NavBar}>
                    <ol className={styles.divLink}>
                        <Link className={styles.link} to="/">Home</Link>
                    </ol>

                    <ol className={styles.divLink}>
                        <Link className={styles.link} to="/empresa">Empresa</Link>
                    </ol>

                    <ol className={styles.divLink}>
                        <Link className={styles.link} to="/contato">Contato</Link>
                    </ol>

            </ul>
        </>
    )
}

export default NavBar;
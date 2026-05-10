import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.list}>
                <li>
                    <FaFacebook/>
                    <span>Facebook</span>
                </li>
                <li>
                    <FaInstagram/>
                    <span>Instagram</span>
                </li>
                <li>
                    <FaLinkedin/>
                    <span>Linkedin</span>
                </li>
            </ul>
            <p><span className={styles.copy}>Costs</span> &copy; 2026</p>
        </footer>
    )
}

export default Footer;
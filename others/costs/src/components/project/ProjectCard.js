import styles from './ProjectCard.module.css'

import { Link } from 'react-router-dom'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, name, budget, profession, handleRemove }) {

    const remove = (e)=>{
        e.preventDefault()
        handleRemove(id)
    }
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <div className={styles.project_card_secundary}>
                <p>
                    <span>Orçamento:</span> R$:{budget}
                </p>
                <p className={styles.profession_text}>
                    <span className={`${styles[profession.toLowerCase()]}`}></span> {profession}
                </p>
                <div className={styles.project_card_secundary_actions}>
                    <Link to={`/project/${id}`}>
                        <BsPencil /> Editar
                    </Link>
                    <button onClick={remove}>
                        <BsFillTrashFill /> Remover
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;
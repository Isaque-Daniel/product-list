import styles from './Projects.module.css'

import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loader from '../layout/Loader'

import { useLocation, useNavigate } from 'react-router-dom'
import Message from '../layout/Message'
import { useState, useEffect } from 'react'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [])

    function removeProjects(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id))
                setMessage("Projeto excluído!")
            })
    }

    const location = useLocation()
    const navigate = useNavigate()


    const [message, setMessage] = useState("")

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message)
            navigate(location.pathname, { replace: true })
        }
    }, [location.pathname, location.state?.message, navigate])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Novo Projeto" />
            </div>
            {message && (
                <Message txt={message} clearMessage={()=>setMessage("")} type="sucess" />
            )}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard handleRemove={removeProjects} name={project.name} id={project.id} budget={project.budget} profession={project.profession.name} key={project.id} />
                    ))
                }
                {
                    !removeLoading && <Loader />
                }
            </Container>
            {removeLoading && projects.length === 0 && (
                <p>Não há projetos cadastrados</p>
            )}
        </div>
    )
}

export default Projects;
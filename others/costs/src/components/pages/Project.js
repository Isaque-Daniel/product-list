import { v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Loader from '../layout/Loader'
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState()
    const [services, setServices] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(err))

        }, 500)
    }, [id])

    function createService(project) {
        setMessage("")
        // last service

        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const currentCost = parseFloat(project.cost) || 0

        const lastServiceCost = parseFloat(lastService.serviceformcost) || 0

        const newCost = currentCost + lastServiceCost

        // maximun value validation

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado! Verifique o valor dos serviços')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total cost

        project.cost = newCost

        // update project

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
            .then((data) => {
                // exibir os services
                setProject(data)
                setServices(data.services)
                setShowServiceForm(false)
                console.log(data)
            })
            .catch((err) => console.log(err))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage("")
        if (project.budget < project.cost) {
            // Mensagem
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType("error")
            return false
        }
        if(project.budget <= 0){
            numericVerify("O orçamento não pode ser menor ou igual a zero!")
        } // Encontrar uma maneira de disparar um erro através do Message caso o input de cost esteja vazio ou = 0
        // https://youtu.be/B9fGJ8EY-Ow?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&t=252

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setMessage("")
                setProject(data)
                setShowProjectForm(false)
                setMessage("Projeto atualizado!")
                setType("sucess")
                // Mensagem
            })
            .catch((err) => console.log(err))
    }

    function numericVerify(text){
        setMessage("")
        setMessage(text)
        setType("error")
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter((service)=>service.id !== id)

        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            setMessage("")
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage("Serviço removido com sucesso!")
            setType("sucess")
        })
        .catch((err)=>console.log(err))

    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message clearMessage={() => setMessage("")} txt={message} type={type} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.profession.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span>{project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span>{project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um servico:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm handleError={numericVerify} handleSubmit={createService} textBtn="Adicionar serviço" projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard key={service.id} id={service.id} name={service.serviceformname} cost={service.serviceformcost} description={service.serviceformdescription} handleRemove={removeService} />
                                ))
                            }
                            {services.length === 0 &&
                                <p>Não há serviços nesse projeto</p>
                            }
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Project;
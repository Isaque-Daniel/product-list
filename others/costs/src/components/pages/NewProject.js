import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import Message from '../layout/Message'

function NewProject() {

    // const [message, setMessage] = useState("")
    // const [type, setType] = useState("error")

    const history = useNavigate()
    // const location = useLocation()

    function createPost(project) {

        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                history('/projects', { state: { message: 'Projeto criado com sucesso' } })
                // redirect
            })
            .catch((err) => console.log(err))
    }

    // useEffect(()=>{
    //     if(location.state?.message){
    //         setMessage(location.state.message)
    //         setType("error")
    //         history(location.pathname, {replace: true})
    //     }
    // }, [location.pathname, history, location.state?.message])

    return (
        <div className={styles.newproject_container}>
            {/* {message &&
                <Message type={type} txt={message} clearMessage={() => setMessage("")} />
            } */}
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject;
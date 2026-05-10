import { useState, useEffect } from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input';
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import { useNavigate, useLocation } from 'react-router-dom'
import Message from '../layout/Message'

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [projects, setProjects] = useState(projectData || {})
    const [isSubmiting, setIsSubmiting] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err))
    }, [])

    function submit(e) {
        e.preventDefault()
        if (isSubmiting) return
        // console.log(projects)
        setIsSubmiting(true)
        handleSubmit(projects)
    }

    function handleChange(e) {
        const val = e.target.name === "budget" ? parseFloat(e.target.value) : e.target.value
        setProjects({ ...projects, [e.target.name]: val })
        if (e.target.name === "budget") {
            if (val <= 0) {
                setMessage("O orçamento não pode ser menor ou igual a zero!")
                setType("error")
            } else {
                setMessage("")
            }
        }
        console.log(projects)
    }

    function handleCategory(e) {
        setProjects({
            ...projects, profession: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
        console.log(projects)
    }

    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message)
            navigate(location.pathname, { replace: true })
        }
    }, [location.pathname, location.state?.message, navigate])

    return (
        <form onSubmit={submit} className={styles.form}>
            {message &&
                <Message type={type} txt={message} clearMessage={() => setMessage("")} />
            }
            <Input type="text" placeholder="Insira o nome do projeto" text="Nome do projeto:" name="name" handleOnChange={handleChange} value={projects.name ? projects.name : ''} />
            <Input type="number" placeholder="Insira o orçamento total" text="Orçamento do projeto:" name="budget" handleOnChange={handleChange} value={projects.budget ? projects.budget : ''} />
            <Select options={categories} text="Selecione a categoria:" name="category_id" handleOnChange={handleCategory} value={projects.profession ? projects.profession.id : ''} />
            <SubmitButton text={isSubmiting ? "Enviando" : btnText} />
        </form>
    )
}

export default ProjectForm;
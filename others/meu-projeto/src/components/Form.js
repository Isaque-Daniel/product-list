import {useEffect, useState} from "react"
import styles from './Form.module.css'
import Select from './Select'

function Form( {handleSubmit} ){
    function cadastrarUser(e){
        e.preventDefault()
        // console.log(name)
        // console.log(password)
        console.log(`O usuário: ${name} foi cadastrado com a senha: ${password}`)
    }

    const [name, setName] = useState("Nome não informado!")
    const [password, setPassword] = useState("Senha não informada!")

    const [categories, setCategories] = useState([])
    const [projects, setProjects] = useState({})
    const [isSubmiting, setIsSubmiting] = useState(false)

    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp)=>resp.json())
        .then((data)=>setCategories(data))
        .catch((err)=>console.log(err))
    })

    function handleChange(e){
        setProjects({...projects, [e.target.name]: e.target.value})
        console.log(projects)
    }

    function Submit(e){
        e.preventDefault()

        if(isSubmiting) return

        console.log(projects.profession)
        handleSubmit(projects)
        setIsSubmiting(true)
    }

    function handleCategory(e){
        setProjects({...projects, profession: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text}
    })
        console.log(projects)
    }

    return(
        <div className={styles.title_control}>
            <h1>Meu Cadastro:</h1>
            <form className={styles.form_control} onSubmit={cadastrarUser}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input onInput={handleChange} onChange={(e)=>setName(e.target.value)} id="name" name="name" type="text" placeholder="Digite o seu nome"/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input onInput={handleChange} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Digite a sua senha"/>
                </div>
                <Select handleOnChange={handleCategory} name="category_id" text="Selecione uma opção" options={categories} value={projects.profession?projects.profession.id:'default'}/>
                <div>
                    <input onClick={Submit} className={styles.btn} type="submit" value={isSubmiting?"Enviando...":"Cadastrar"}/>
                </div>
            </form>
        </div>
    )
}

export default Form;
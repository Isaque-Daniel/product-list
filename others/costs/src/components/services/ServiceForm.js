import styles from '../project/ProjectForm.module.css'

import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

function ServiceForm({ handleSubmit, textBtn, projectData, handleError }){

    const [services, setService] = useState([])

    function submit(e){
        e.preventDefault()
        projectData.services.push(services)
        handleSubmit(projectData)

        // Já recebi o projectData, adicionei ao array services do db.json() os serviços em si com um array com diferentes tópicos, falta criar a function createService e para receber de volta os dados atualizados e adiciona-los ao db.json()

        //https://youtu.be/2HN9n8lrfQk?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&t=622
    }

    function handleChange(e){
        // console.log(projectData.servicefomrcost)
        const updatedServices = {...services, [e.target.name]: e.target.value}
        // console.log(updatedServices.serviceformcost)
        // console.log(updatedServices["serviceformcost"])
        const value = parseFloat(e.target.value)
        if(updatedServices["serviceformcost"] && value <= 0){
            handleError("O custo não pode ser menor ou igual a zero!")
            e.target.value = ""
        }
        setService(updatedServices)
    }
    
    return(
        <form className={styles.form} onSubmit={submit}>
            <Input type="text" text="Nome do serviço" name="serviceformname" placeholder="Insira o nome do serviço" handleOnChange={handleChange}/>
            <Input type="number" text="Custo do serviço" name="serviceformcost" placeholder="Insira o valor total" handleOnChange={handleChange}/>
            <Input type="text" text="Descrição do serviço" name="serviceformdescription" placeholder="Escreva serviço" handleOnChange={handleChange}/>
            <SubmitButton text={textBtn}/>
        </form>
    )
} 

export default ServiceForm;
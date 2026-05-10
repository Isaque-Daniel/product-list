import { useState } from 'react'

function Condicional(){

    const [email, setEmail] = useState()
    const [userEmail, setUserEmail] = useState()

    function enviarEmail(e){
        e.preventDefault()
        setUserEmail(email)
        console.log(userEmail)
    }

    function limparEmail(e){
        const inp = document.querySelector("#inp")
        e.preventDefault()
        setUserEmail('')
        setEmail('')
        inp.value = ''
    }

    return (
        <div>
            <h2>Cadastre o seu e-mail:</h2>
            <form>
                <input id="inp" type="email" placeholder="Digite o seu e-mail" onInput={(e) => setEmail(e.target.value)}/>
                <button onClick={enviarEmail}>Enviar e-mail</button>
            </form>
            {userEmail && (
                <div>
                    <h2>O email do usuário é: {userEmail}</h2>
                    <button onClick={limparEmail}>Limpar Email</button>
                </div>
            )
            }
        </div>
    )
}

export default Condicional;
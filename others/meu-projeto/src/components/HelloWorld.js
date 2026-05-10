import Frase from "./Frase"

function HelloWorld(){

    const url = 'https://placehold.co/400'
    return (
        <div>
            <Frase/>
            <h1>Meu primeiro componente!</h1>
            <img src={url}></img>
        </div>
    )
}

export default HelloWorld;
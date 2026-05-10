import Button from "./eventos/Button";

function Evento({numero}){

    function meuEvento(){
        for(let x = numero; x > 0; x--){
            console.log(`Opa, fui ativado ${numero} ${numero>1?"vezes":"vez"}!`)
        }        
    }
    
    function segundoEvento(){
        console.log("Fui clicado no segundo evento")
    }

    return (
        <>
            <p>Clique para disparar um evento:</p>
            <Button event={meuEvento} text="Primeiro Evento"/>
            <Button event={segundoEvento} text="Segundo Evento"/>
            {/* <button onClick={meuEvento}>Disparar {numero} {numero>1?"vezes":"vez"}</button> */}
        </>
    )
}

export default Evento;
function SeuNome({setNome}){
    return (
        <div>
            <p>Digite o seu nome:</p>
            <input type="text" placeholder="Qual é o seu nome?" onInput={(el)=>setNome(el.target.value)}/>
        </div>
    )
}

export default SeuNome;
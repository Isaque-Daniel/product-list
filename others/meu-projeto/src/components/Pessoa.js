function Pessoa({nome, idade, profissao, foto}){
    return (
        <div>
            <img src={foto} alt={nome}/>
            <h3>Nome: {nome}</h3>
            <p>Idade: {idade}</p>
            <p>Profissão {profissao}</p>
        </div>
    )
}

export default Pessoa
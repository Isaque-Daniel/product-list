function Saudacao({nome}){

    function gerarSaudacao(algumNome){
        return `Olá, ${algumNome}, tudo bem?`
    }

    return(
        <>
            {nome === undefined || nome === '' ? (
                <>
                </>
            ) : (
                <p>{gerarSaudacao(nome)}</p>
            )}
        </>
    )
}

export default Saudacao;
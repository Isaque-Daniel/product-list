function OtherList({itens}){
    return (
        <>
            <h2>Lista de coisas boas:</h2>
            {itens.length > 0 ? (
                itens.map((el, ind)=>(
                    <p key={ind}>{el}</p>
                ))) : (
                    <p>Não a itens nessa lista!</p>
                )
            }
        </>
    )
}

export default OtherList;
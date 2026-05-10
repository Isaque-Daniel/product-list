import PropTypes from 'prop-types'

function Item({marca = "Marca Desconhecida", ano_lancamento = "Ano não informado"}){
    return (
        <>
            <li>{marca} - {ano_lancamento}</li>
            <p>Teste</p>
        </>
    )
}

Item.propTypes = {
    marca: PropTypes.string.isRequired,
    ano_lancamento: PropTypes.number.isRequired,
}

export default Item;
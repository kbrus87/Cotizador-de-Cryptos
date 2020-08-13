import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Error from './Error';

import useMoneda from '../hooks/useMoneda';
import useCrypto from '../hooks/useCrypto';

const Boton = styled.input `
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    color:#fff;
    transition:background-color .3s ease;

    &:hover {
        background-color:#326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({setMoneda, setCrypto}) => {

    //state de listado de cryptos
    const [ listaCrypto, setListaCrypto] = useState([]);
    const [ error, setError] = useState(false);

    const MONEDAS = [
        {codigo:'USD', nombre:'Dolar de Estados Unidos'},
        {codigo:'EUR', nombre:'Euros'},
        {codigo:'ARS', nombre:'Peso Argentino'},
        {codigo:'GBP', nombre:'Libras Esterlinas'},
        {codigo:'MXN', nombre:'Peso Mexicano'}
    ]

    const [criptomoneda, SelectCripto] = useCrypto('Elige tu Criptomoneda','' ,listaCrypto);

    //Utilizar useMoneda
    const [ moneda, SelectMoneda ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //Ejecutar llamado a la API
    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            setListaCrypto(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    const cotizarMoneda = e => {
        e.preventDefault();

        //validacion
        if(moneda === '' || criptomoneda === ''){
            setError(true);
            return;
        }

        //pasar datos al componente principal
        setError(false);
        setMoneda(moneda);
        setCrypto(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Hay un error' /> : null}
        <SelectMoneda />
        <SelectCripto />
        <Boton
            type="submit"
            value="Calcular"
        />
    </form>
     );
}
 
export default Formulario;


import React, {useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label `
    font-family:'Bebas Neue', cursive;
    color:#FFF;
    text-transform:uppercase;
    font-weight:bold;
    font-size:2.4rem;
    margin-top:2rem;
    display:block;
`;

const Select = styled.select `
    width:100%;
    display:block;
    padding:1rem;
    -webkit-appearance:none;
    border-radius:10px;
    border:none;
    font-size:1.2rem;
`;

const useCrypto = (label, stateInicial, opciones) => {

    const [state, setState] = useState(stateInicial);

    const SelectCrypto = () => (
        <>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="">-Seleccione-</option>
                {opciones.map(opcion => (
                     <option 
                     key={opcion.CoinInfo.Id} 
                     value={opcion.CoinInfo.Name}>
                         {opcion.CoinInfo.FullName} / {opcion.CoinInfo.Name}
                    </option>
                ))}
            </Select>
        </>
    )

    //Retornar state, interfaz y funcion que modifica state
    return [state, SelectCrypto, setState];
}   

export default useCrypto;
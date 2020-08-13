import React from 'react';
import styled from '@emotion/styled';


const ResultadoDiv = styled.div `
    color:#FFF;
    
    margin:5px 10px 10px 10px;
    padding:50px 10px 10px 30px;
    border-radius:10px;
    font-family:Arial, Helvetica, sans-serif;
`;

const Info = styled.p `
    font-size:18px;

    span{
        font-weight:bold;
    }
`;

const Precio = styled.p `
    font-size:30px;
`;

const Crypto = styled.h1 `
    font-size:45px;
    color:yellow;
    letter-spacing:5px;
    margin:0;
`;


const Cotizacion = ({cotizacion, cotizacionUSD, moneda, crypto, resultado}) => {
    
    if(Object.keys(cotizacion).length === 0) return null;

    console.log([resultado, moneda, crypto, ['Mauro te hago la cola', 'en tu cara Polo']]);
    return ( 
        
        <ResultadoDiv id='ResultadoDiv'>
            <Crypto>{crypto}</Crypto>
            <Precio>
            El precio en {moneda} es: <span>{cotizacion.PRICE}</span>
            </Precio>
            <Precio>
            El precio en USD: <span>{cotizacionUSD.PRICE}</span>
            </Precio>
            <Info>
            El precio máximo en {moneda} es: <span>{cotizacion.HIGHDAY}</span>
            </Info>
            <Info>
            El precio mínimo en {moneda} es: <span>{cotizacion.LOWDAY}</span>
            </Info>
            <Info>
            El precio máximo en USD es: <span>{cotizacionUSD.HIGHDAY}</span>
            </Info>
            <Info>
            El precio mínimo en USD es: <span>{cotizacionUSD.LOWDAY}</span>
            </Info>
            <Info>
                Variación ultimas 24hs en {moneda}: <span>{cotizacion.CHANGEPCT24HOUR} %</span>
            </Info>
            <Info>
                CCL = {(resultado[0].PRICE/resultado[1].PRICE).toFixed(2)} {`${resultado[0].TOSYMBOL}/${resultado[1].TOSYMBOL}`}
            </Info>
            <Info>
                CCL máx = {(resultado[0].HIGHDAY/resultado[1].HIGHDAY).toFixed(2)} {`${resultado[0].TOSYMBOL}/${resultado[1].TOSYMBOL}`}
            </Info>
            <Info>
                CCL min = {(resultado[0].LOWDAY/resultado[1].LOWDAY).toFixed(2)} {`${resultado[0].TOSYMBOL}/${resultado[1].TOSYMBOL}`}
            </Info>
            <Info>
                Ultima actualización: {cotizacion.LASTUPDATE}
            </Info>
        </ResultadoDiv>
     );
}
 
export default Cotizacion;
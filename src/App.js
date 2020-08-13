import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

import axios from 'axios';

const Contenedor = styled.div `
  max-width:100%;
  margin:0 auto;
  display:flex;
  flex-direction:column-reverse;

  @media (min-width:768px){
    display:grid;
    max-width:90%;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1 `
  font-family: 'Bebas Neue', cursive;
  color:#FFF;
  text-align:left;
  font-weight:700;
  font-size:50px;
  margin-bottom:50px;
  margin-top:5px;

  @media (min-width: 768px) {
    margin-top:80px;
  }
  

  &::after{
    content:'';
    width:100px;
    height:10px;
    background-color:#66A2FE;
    display:block;
  }
`

const Imagen = styled.img `
  box-sizing:border-box;
  max-width:100%;
  margin-top:60px;
  @media (min-width:768px){
    max-height:80vh;
  }
`;

const Resumen = styled.div `
  display:flex;
  align-items:center;
  justify-content:space-evenly;
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [crypto, setCrypto] = useState ('');
  const [cotizacion, setCotizacion] = useState({})
  const [cotizacionUSD, setCotizacionUSD] = useState({})
  const [resultado, setResultado] = useState({})
  const [apiOK, setApiOK] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    
    const cotizarCrypto = async () => {
      if(moneda === '') return ;
      
      //consulta API para obtener cotizacion
      setApiOK(false)
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=USD,${moneda}`;

      const resultado = await axios.get(url);
      
      setLoading(true)
      
        const spinner = document.querySelector('#spinner');
        spinner.scrollIntoView();
      
      setTimeout( ()=>{
        
        setCotizacion(resultado.data.DISPLAY[crypto][moneda])
        setCotizacionUSD(resultado.data.DISPLAY[crypto].USD)
        setResultado([resultado.data.RAW[crypto][moneda], resultado.data.RAW[crypto].USD]);

        setLoading(false)
        setApiOK(true)
      }, 1000)      
    }

    cotizarCrypto();
    const interval = setInterval( () => {cotizarCrypto()
    }, 30000);
    return () => clearInterval(interval);

  },[moneda, crypto])

 
  return (   <Contenedor>
     <Resumen>

        {(() => {
          if(apiOK === false && loading === false){
          return <Imagen src={imagen} alt='Imagen cryptos'/>
          }else{
            return (!loading ? <Cotizacion cotizacion={cotizacion} cotizacionUSD={cotizacionUSD} moneda={moneda} crypto={crypto} resultado={resultado} /> :  <Spinner /> )
          }
        })()}

     </Resumen>
     <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMoneda={setMoneda}
                    setCrypto={setCrypto}
                    
        />               
     </div>
     
   </Contenedor>
  );
}

export default App;

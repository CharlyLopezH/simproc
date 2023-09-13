import { useState } from 'react';

const App=()=>{

  const [parcArray,setParcArray]=useState([]);

  const [procesArray, setProcesArray]=[];

  const [tTotal, setTTotal] = useState(0);
  const [tParcial, setTParcial]=useState(0);
  const [sumaParciales,setSumaParciales]=useState(0);
  const [cantProcs, setCantProcs]=useState('');


  const onChangeCantProcs=({target})=>{
    console.log('onChange');    
    if (isNaN(target.value) || target.value>20) {return}; 
    console.log(target.value);
    setCantProcs(target.value);
  }

  const ejecutarProceso =(ciclos)=>{
    let tIni=Date.now();
    for (let i=0;i<=ciclos;i++){
      console.log(i);
    }
    let tFin=Date.now();
    let tParcial = tFin-tIni;
    setTParcial(tParcial);
    //console.log('Tiempo parcial Proceso: '+tParcial);
    //let sumaTtotal = tParcial;
    setTTotal(tTotal+tParcial);
    //console.log('Suma Total: '+tTotal);   
    return (tParcial); 
  }

  const  iniciarSimulacion=()=>{

    //Llenado de arreglo de procesos.
    for(let x=0; x<=cantProcs;x++ ) {
    console.log(x);
    setProcesArray(x);

    }





    //console.log('Iniciaré Simulación');
    // const d1 = ejecutarProceso(5000) ;
    // console.log('Duración d1: '+d1);
    // parcArray.push(d1);

    // const d2 = ejecutarProceso(8000) ;
    // console.log('Duración d2: '+d2);
    // parcArray.push(d2);

    // const d3 = ejecutarProceso(900) ;
    // console.log('Duración d3: '+d3);
    // parcArray.push(d3);

    // const d4 = ejecutarProceso(33000) ;
    // console.log('Duración d4: '+d4);
    // parcArray.push(d4);

    //   //console.log(parcArray);

    //   setSumaParciales(d1 + d2 + d3 +d4);

  }

  return (
    <>
    <div className='container'>
      <h2>Simulación de Procesos</h2>
      <hr/>
      <div className='col-6 md'>
      <input 
                    className="form-control"
                    min={1}
                    max={10}
                    type="text"
                    placeholder="No. de Procesos"
                    autoComplete="off"
                    name= "cantProcs"
                    value={cantProcs}
                    onChange={(e)=>onChangeCantProcs(e)}
                    >
                </input>
                </div>

      <div>        
        <button  className='btn btn-success mt-2'
                 onClick={()=>iniciarSimulacion()}>
          Click para iniciar simulación 
        </button>
        <p>
          {/* Edit <code>src/App.jsx</code> and save to test HMR */}
        </p>
      </div>
      <p className="read-the-docs">
        {/* Click on the Vite and React logos to learn more */}
      </p>

      {(tTotal>0) && (
      <div >
        Resultados:     
       {parcArray.map(t => (        
            <li key={t}>  {t} ms</li>            
          ))            

        }
      T. Total {sumaParciales / 1000} seg. 
      </div>
      )}

      </div>
    </>
  )
}

export default App

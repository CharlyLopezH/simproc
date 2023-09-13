import { useState } from "react";

export const App = () => {
  //const objetoInicial= [{pId:1, nombre:'Proceso'}];

  const [arrObj, setArrObj] = useState([]);

  const [cantProcs, setCantProcs]=useState('');

  const [tTotal,setTTotal]=useState(0);

  const [mostarResultados,setMostrarResultados]=useState(false);
  
  const [mostrarProcesando, setMostrarProcesando]=useState(false);

  const obtenerNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const onChangeCantProcs=({target})=>{
    console.log('onChange');    
    if (isNaN(target.value) || target.value>20) {return}; 
    console.log(target.value);
    setCantProcs(target.value);
  }

  async function iniciarSimulacion () {
    
    setMostrarProcesando(true);
    await new Promise((resolve) => setTimeout(resolve, 100));


    console.log('poner procesando en true tag...' + mostrarProcesando);    
    //Cargar Procesos al Objeto        
    const totalProcesos = cantProcs;
    const result = await cargarArregloProcesos(totalProcesos);        
    console.log(result);
  };

  async function cargarArregloProcesos(totalProcesos){
    console.log("Cargando objeto de procesos: " + totalProcesos);
    //console.log(r);
    const nuevosProcesos = [];
    let sumaParciales=0;
    for (let x = 0; x < totalProcesos; x++) {
      //Obtener números aleatorios entre 1000 y 30000;      
      const r = obtenerNumeroAleatorio(1000, 15000);
            //Por cada proceso ejecutar la simulación parcial
      let ms = simulacionParcial(x,r);
      //console.log('Duración del proceso '+x+' '+ms);
      sumaParciales=sumaParciales+ms;
      //console.log('Suma Parciales:::'+ms);      
      const result = nuevosProcesos.push({ pId: x, nombre: "Proceso " + x, ciclosRand: r, duracion:ms });           
    }    
    setTTotal(sumaParciales);
    console.log(nuevosProcesos);
    setArrObj([...arrObj, ...nuevosProcesos]);
    setMostrarResultados(true);
    setMostrarProcesando(false);
    return new Promise((resolve)=>resolve('Finalizado')); 
  };

  function simulacionParcial(idP, ciclos){
    console.log('entre... sim parcial '+idP+' No.Ciclos:'+ciclos)    
    const tInicio=Date.now();
    for (let i=0; i<=ciclos; i++) {
      console.log('simulando proceso: '+idP);
       }    
    const fFin=Date.now();
    let t = fFin-tInicio;
    return t;
  }

  return (
    <>
      <div className="container">
        <h2>Simulación de procesos</h2>
        <code> 
            Este ejercicio ejecutará n procesos (min 10, máx 20) realizando una ejecución de procesos con iteraciones aleatorias por cada uno.
        </code>        
        <hr />

        <input
          className="form-control"
          min={1}
          max={10}
          type="text"
          placeholder="No. de Procesos (min 1, max 20)"
          autoComplete="off"
          name="cantProcs"
          value={cantProcs}
          onChange={(e) => onChangeCantProcs(e)}
        ></input>


        <button
          className="btn btn-success mt-2"
          onClick={() => iniciarSimulacion()}
        >
          Click para iniciar simulación
        </button>
        <hr/>
        {
                  (mostrarProcesando) && 
                  (
                    <h2>PROCESANDO...</h2>
                  )
        }
        <ul>
          {arrObj.map((item) => (
            <li key={item.pId}>
              {item.nombre + ", ciclos: " + item.ciclosRand + ' -> '+ item.duracion+' ms'}
            </li>
          ))}
        </ul>  
        { 
        (mostarResultados) && (
            <div>
            {cantProcs} procesos, en un tiempo Total: {tTotal} (milisegundos)
            </div>
        ) 
        }
      </div>
    </>
  );
};
export default App;

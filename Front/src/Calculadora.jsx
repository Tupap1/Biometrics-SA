import React, { useTransition } from 'react'
import { useState, useEffect } from 'react'
import Form from './components/ui/Form'
import Boton from './components/ui/Boton'
import Lista from './components/ui/Lista'
import axios from 'axios'


function Calculadora() {
    const [numerocomidas, setNumerocomidas] = useState("")
    const [biomasa, setBiomasa] = useState("")
    const [idbiometria, setIdbiometria] = useState("")
    const [datos, setDatos] = useState({})
    const [tasa, setTasa] = useState("")
    const [raciones, setRaciones] = useState("")
    const [cantidadalimento ,setCantidadalimento] = useState("")

    const obtenterbiomasa = async (e) => {
        const response = await axios.get(`http://127.0.0.1:5000/biometria/${idbiometria}`)
        console.log(response.data)
        setDatos(response.data)
        setBiomasa(response.data.biomasa)
    }
    
    useEffect(() => {
        obtenterbiomasa()
    }, [idbiometria])
    
    
    
    const calcularRaciones = async (e) => {
        const racion = parseFloat(biomasa)*parseFloat(tasa)
        const racionesindividuales = parseFloat(racion)/parseInt(numerocomidas)
        console.log(parseFloat(racionesindividuales))
        console.log(racion)
        setCantidadalimento(parseFloat(racion))
        setRaciones(parseFloat(racionesindividuales))
    }


  return (
    <div>
        <h1>Calcular Comidas</h1>
        <label htmlFor="">Selecciona una Biometria</label>
        <Lista oninit={(e) => setIdbiometria(e)} value={idbiometria} onChange={(e) => setIdbiometria(e.target.value)} apiURL={"http://127.0.0.1:5000/consultarbiometrias"}></Lista>
        {datos && datos != "" ?(<h5>El peso promedio de tu biometria es de {datos.peso} gr</h5> ):("")}
        <Form type='number' value={numerocomidas} onChange={(e) => setNumerocomidas(e.target.value)} placeholder='Ingresa la cantidad de raciones'></Form>
        <Form type='number' value={tasa} onChange={(e) => setTasa(e.target.value)} placeholder='Ingresa tasa de alimentacion'></Form>
        <Boton className='btn btn-primary' onClickCustom={calcularRaciones} text='Calcular'></Boton>
        {cantidadalimento && cantidadalimento != "" && raciones !="" ?(<h5> Son {cantidadalimento} gr en porciones de {raciones} gr</h5>  ):("")}
    </div>
  )
}

export default Calculadora
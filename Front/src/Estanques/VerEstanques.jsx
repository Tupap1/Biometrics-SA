import React from 'react'
import Card from '../components/ui/Card'

function VerEstanques() {
  return (
    <div>
      <div><h1>consultar Estanques</h1></div>
    <div><Card info={"nombre_pez"} title={"nombreEstanque"} textboton={"ver Estanque"}  apiURL={'http://127.0.0.1:5000/consultarestanque'}/></div>
    </div>)
}

export default VerEstanques
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "../components/styles/modal.css";
import Form from "../components/ui/Form";
import Boton from "../components/ui/Boton";
import Lista from "../components/ui/Lista";
import Card from "../components/ui/Card";

function DetallesEstanque({ estanqueId }) {
  let params = useParams();
  const navigate = useNavigate();
  const [estanque, setEstanque] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [nombreEstanque, setNombreEstanque] = useState("")
  const [numeropeces, setNumeroPeces] = useState("")
  const [mortalidad, setMortalidad] = useState("")
  const [tamano, setTamano] = useState("")
  const [pez, setPez] = useState("")


  useEffect(() => {
    fetchEstanque();
  }, [estanque.id]);


  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await axios.delete(`http://127.0.0.1:5000/borrarestanque/${estanque.id}`);
        alert("Estanque eliminado con éxito");
        closePopup();
        navigate(to="/VerEstanques")
      } catch (error) {
        console.error(error);
        alert("Error al eliminar el Estanque");
        
      }
    }
  };

  const openPopup = () => {
    setPopupOpen(true);
    fetchEstanque();
  };

  const closePopup = () => {
    setPopupOpen(false);
    fetchEstanque();
  };


  const fetchEstanque = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/estanque/${params.id}`
      );
      setEstanque(response.data);
      setNombreEstanque(estanque.nombre)
      setNumeroPeces(estanque.numeropeces)
      setTamano(estanque.tamano)
      setMortalidad(estanque.mortalidad)
      console.log(estanque);
    } catch (error) {
      console.error("Error al obtener datos del estanque:", error);
    }
  };




  const datosestanque = {
    nombreEstanque:nombreEstanque,
    numeropeces:numeropeces,
    mortalidad:mortalidad,
    tamano:tamano,
    id_pez:pez
  }


  const handleSaveEdit = async () => {
    try {
      fetchEstanque()
      const response = await axios.put(`http://127.0.0.1:5000/estanque/${estanque.id}`, datosestanque);
      console.log(response);
      closePopup();
      fetchEstanque();
      alert('Datos estanque editados con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al editar Datos estanque');
    }
  };



  return (
    <div>
      {estanque && (
        <>
          <h2>
            Estanque {estanque.id} "{estanque.nombre}"
          </h2>
          <p>estanque: {estanque.nombre}</p>
          <p>Peces: {estanque.nombrepez}</p>
          <p>numero de peces: {estanque.numeropeces}</p>
          <p>mortalidad: {estanque.mortalidad}</p>
          <p>tamano: {estanque.tamano} m2</p>

          <button className="btn btn-primary" onClick={openPopup}>
            Editar Datos
          </button>


          <div
            className="row justify-content-center align-items-center g-2"
          >
            <div className="col">
              <h5>Biometrias realizadas en este estanque</h5>

              <Card textboton={"ver Biometria"} title={"id"} info={"fecha"} info2={"hora"} apiURL={`http://127.0.0.1:5000/verbiometria/${estanque.id}`} error={"No se han realizado biometrias en este estanque"} /></div>
            <div className="col">
              <h5>Alimentaciones recientes</h5>
               <Card error={"no se ha alimentado en este estanque recientemente"}  info={"hora"} title={"fecha"} info2={"cantidad"} text2={"cantidad:"} texto2={"KG"} apiURL={`http://127.0.0.1:5000/verAlimentaciones/${estanque.id}`} textboton={"Ver Alimentacion"}></Card></div>

               <div className="col">
              <h5>Registros WQ recientes</h5>
               <Card error={"no se han realizado WQ en este estanque recientemente"}  apiURL={`http://127.0.0.1:5000/verWQ/${estanque.id}`} textboton={"Ver Alimentacion"}></Card></div>
          </div>
          
        </>
      )}

      {isPopupOpen && (
        <div id="modal" className="modal-container">
          <div className="modal-body">
            <h2>Editar estanque</h2>
            <Form  value={nombreEstanque} onChange={(e) => {setNombreEstanque(e.target.value)}} placeholder="Nombre estanque"></Form>
            <Lista onInit={(e) => setPez(e)}  value={pez} onChange={(e) => setPez(e.target.value)} apiURL={"http://127.0.0.1:5000/consultarpeces"}></Lista>
            <Form value={numeropeces} onChange={(e) => {setNumeroPeces(e.target.value)}} placeholder="Numero Peces"></Form>
            <Form value={mortalidad} onChange={(e) => setMortalidad(e.target.value)} placeholder="Mortalidad"></Form>
            <Form value={tamano} onChange={(e => setTamano(e.target.value))} placeholder="tamaño estanque"></Form>
            <div className="row" >
              <div className="col">
              <button
                id="boton cerrar"
                className="btn btn-primary"
                onClick={closePopup}
              >
                Cerrar
              </button></div>
              <div className="col">
              <Boton className="btn btn-primary" onClickCustom={handleSaveEdit} text="Actualizar Datos"></Boton>
              <Boton className="btn btn-danger" onClickCustom={handleDelete} text="Eliminar"></Boton>
              </div>            </div>
        
          </div>
        </div>
      )}
    </div>
  );
}

export default DetallesEstanque;

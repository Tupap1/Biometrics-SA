import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "../components/ui/Form";
import Boton from "../components/ui/Boton";
import Lista from "../components/ui/Lista";

function VerAlimentacion() {
  const [Datos, setDatos] = useState([]);
  const [nombrealimento, setnombrealimento] = useState("");
  const [Observaciones, setObservaciones] = useState("");
  const [Estanque, setEstanque] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [idalimento, setidalimento] = useState("");
  const [alimentacionseleccionada, setalimentoseleccionado] = useState([
    cantidad,
    nombrealimento,
    unidad,
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchDatos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/veralimentacion");
      setDatos(response.data);
    } catch (error) {
      console.error(error);
      alert("Error al consultar alimentos");
    }
  };

  const fetchData = async () => {
    if (!alimentacionseleccionada) return;
    try {
      const response = await axios.get("http://127.0.0.1:5000/veralimentacion");
      const matchingalimento = response.data.find(
        (ali) => ali.id === parseInt(alimentacionseleccionada)
      );
      console.log(matchingalimento);
      setUnidad(alimentacionseleccionada.unidad);
      setcantidad(alimentacionseleccionada.cantidad);
      setnombrealimento(alimentacionseleccionada.nombreAlimento);
      setObservaciones(alimentacionseleccionada.observaciones);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDatos();
    if (alimentacionseleccionada) {
      fetchData();
    }
  }, [alimentacionseleccionada]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await axios.delete(`http://127.0.0.1:5000/borraralimentacion/${id}`);
        alert("Alimentación eliminada con éxito");
        fetchDatos();
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        alert("Error al eliminar la alimentación");
      }
    }
  };

  const handleEdit = (dato) => {
    setidalimento(dato.id);
    setalimentoseleccionado(dato);
    fetchData();
    setIsEditing(true);
    console.log("editando");
    console.log(idalimento);
  };

  const alimentodata = {
    nombrealimento: parseInt(nombrealimento),
    cantidad: cantidad,
    unidad: unidad,
    estanque: parseInt(Estanque),
    observaciones: Observaciones,
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/alimentaciones/${alimentacionseleccionada.id}`,
        alimentodata
      );
      console.log(response);
      alert("Alimentacion editada con éxito");
      setIsEditing(false);
      fetchDatos();
    } catch (error) {
      console.error(error);
      alert("Error al editar alimentacion");
    }
  };

  const handleCancelEdit = () => {
    setalimentoseleccionado(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Alimentaciones</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estanque</th>
            <th>Alimento</th>
            <th>Cantidad</th>
            <th>fecha</th>
            <th>hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombreestanque}</td>
              <td>{dato.nombreAlimento}</td>
              <td>
                {dato.cantidad} {dato.unidad}
              </td>
              <td>{dato.fecha}</td>
              <td>{dato.hora}</td>

              <td>
                <Boton
                  className="btn btn-primary"
                  text="editar"
                  onClickCustom={(e) => {
                    fetchData();
                    handleEdit(dato);
                  }}
                ></Boton>
                <td>

                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div>
          <h2>Editando Alimento "{alimentacionseleccionada.id}"</h2>
          <label htmlFor="">Selecciona el estanque</label>
          <Lista
            onChange={(e) => {
              setEstanque(e.target.value);
            }}
            apiURL="http://127.0.0.1:5000/consultarestanque"
          ></Lista>
          <label htmlFor="">Selecciona el alimento</label>
          <Lista
            value={nombrealimento}
            onChange={(e) => setnombrealimento(e.target.value)}
            apiURL={"http://127.0.0.1:5000/veralimentos"}
          ></Lista>

          <Form
            value={cantidad}
            onChange={(e) => setcantidad(e.target.value)}
            placeholder="Cantidad Alimento"
          ></Form>
          <Form
            placeholder="Unidad"
            value={unidad}
            onChange={(e) => {
              setUnidad(e.target.value);
              setUnidad(e.target.value.toUpperCase());
            }}
          ></Form>
          <textarea
            className="form-control"
            value={Observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          ></textarea>
          <div className="col-9">
          <button className="btn btn-primary" onClick={handleSaveEdit}>Guardar</button>
          <button className="btn btn-primary" onClick={handleCancelEdit}>Cancelar</button>
          <Boton className="btn btn-danger"    text="eliminar"  onClickCustom={() => handleDelete(alimentacionseleccionada.id)}></Boton></div>
        </div>
      )}

      <Boton
        className="btn btn-primary"
        to="/RegistrarAlimentacion"
        text="+"
      ></Boton>
    </div>
  );
}

export default VerAlimentacion;

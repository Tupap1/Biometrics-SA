import '../components/styles/WQRecords.css'
import logo1 from '../assets/logo1.svg' 
import Volver from '../components/ui/Volver';
const WaterQualityRecords = () => {
 
  const records = [
    { date: '05/8/2024', pond: 'Estanque 1', user: 'ADMIN', quality: 'Bueno', contamination: '45%' },
    { date: '07/8/2024', pond: 'Estanque 2', user: 'ADMIN', quality: 'Malo', contamination: '45%' },
    { date: '09/8/2024', pond: 'Estanque 3', user: 'ADMIN', quality: 'Malo', contamination: '45%' },
    { date: '03/8/2024', pond: 'Estanque 4', user: 'ADMIN', quality: 'Bueno', contamination: '45%' },
    { date: '01/8/2024', pond: 'Estanque 5', user: 'ADMIN', quality: 'Malo', contamination: '45%' },
    { date: '03/8/2024', pond: 'Estanque 6', user: 'ADMIN', quality: 'Malo', contamination: '45%' },
    { date: '02/8/2024', pond: 'Estanque 7', user: 'ADMIN', quality: 'Malo', contamination: '45%' },
    { date: '08/8/2024', pond: 'Estanque 8', user: 'ADMIN', quality: 'Bueno', contamination: '45%' },
    { date: '06/8/2024', pond: 'Estanque 9', user: 'ADMIN', quality: 'Bueno', contamination: '45%' },
  ];

  return (
    
    <div className="container"> 
      <div className="row  mb-2 mt-1">
          <div className="col-1 ">
            <Volver />
          </div>
          <div className="col-9 mx-auto ">
          
            {" "}
            <center>
              <img id="logo"src={logo1} alt="" />
              <p></p>
              <p></p>
              <h1>Water Quality </h1>
            </center>
          </div>
        </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estanque</th>
              <th>Usuario</th>
              <th>Estado Cualitativo</th>
              <th>Niveles de contaminación general</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.pond}</td>
                <td>{record.user}</td>
                <td>{record.quality}</td>
                <td>{record.contamination}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default WaterQualityRecords;

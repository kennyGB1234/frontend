import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estiloCoches.css';

const Coches = () => {
  const [coches, setCoches] = useState([]);
  const [mensaje, setMensaje] = useState(false);

  const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));

  useEffect(() => {
    const obtenerCoches = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/usuarios/cochesAlquilados/${datosUsuario.userId}`);
        console.log(response.data.coche);
        setCoches(response.data.coche);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCoches();
  }, []);

  useEffect(() => {
    if (coches.length === 0) {
      setMensaje(true);
    } else {
      setMensaje(false);
    }
  }, [coches]);

  return (
    <div className='plantilla'>
      {mensaje ? (
        <h1>No hay coches pendientes de revisión</h1>
      ) : (
        <div>
          <h1>Coches pendientes de revisión: {coches.length}</h1>
          {coches.map((coche, index) => (
            <div key={index} className='tarjeta'>
              <div className='imagen'>
                <img src={coche.imagen} alt={coche.nombre} />
              </div>
              <h2>{coche.nombre}</h2>
              <p>
                <span id='parametro'>Marca:</span> {coche.marca}
              </p>
              <p>
                <span id='parametro'>Modelo:</span> {coche.modelo}
              </p>
              <p>
                <span id='parametro'>Año:</span> {coche.año}
              </p>
              <p>
                <span id='parametro'>Precio:</span> {coche.precio}/día
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coches;
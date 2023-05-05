import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estiloCoches.css';

const Coches = ({ userId, cochesAlquilados }) => {
  const [coches, setCoches] = useState([]);
  const [cochesAlquiladosLocal, setCochesAlquiladosLocal] = useState([]);

  useEffect(() => {
    const obtenerCoches = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/coches');
        console.log(response.data.coches);
        setCoches(response.data.coches);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCoches();
  }, []);

  const handleAlquilarCoche = async (cocheId) => {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    console.log(datosUsuario);
    const { userId, token } = datosUsuario;

    try {
      const response = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/usuarios/alquilar/${userId}`,
        {
          coches: cocheId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert('Coche alquilado con éxito');
      setCochesAlquiladosLocal([...cochesAlquiladosLocal, cocheId]);
    } catch (error) {
      console.log(error);
      alert('Error al alquilar el coche');
    }
  };

  return (
    <div className='plantilla'>
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
          <button type='button' onClick={() => handleAlquilarCoche(coche._id)}>Alquilar</button>
        </div>
      ))}
    </div>
  );
};

export default Coches;
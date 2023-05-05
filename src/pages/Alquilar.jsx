import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './estiloAlquilar.css'

const Alquilar = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegar = useNavigate();

  const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
  console.log(datosUsuario);

  console.log(datosUsuario.userId)
  const gestorFormulario = async (data) => {
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + `/coches/${datosUsuario.userId}/publicar`, {
        imagen: data.imagen,
        nombre: data.nombre,
        marca: data.marca,
        modelo: data.modelo,
        año: data.año,
        precio: data.precio,
      });
      console.log("Todo correcto", response.data);
      setMostrarMensaje(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onSubmit = (data) => {
    const usuarioId = datosUsuario.userId;
    const { imagen, nombre, marca, modelo, año, precio } = data;
    gestorFormulario(usuarioId, {
      imagen,
      nombre,
      marca,
      modelo,
      año,
      precio,
    });
  };

  if (mostrarMensaje) {
    return (
      <div>
        <h1 className="mensajeCreado">|| Coche creado correctamente ||</h1>
        {setTimeout(() => navegar("/"), 2000)}
      </div>
    );
  }
  
    return (
      <div className="Formuuu">
        <div className="inputs">
          <form onSubmit={handleSubmit(gestorFormulario)}>
            <input
              type="text"
              name="imagen"
              placeholder="Imagen"
              {...register("imagen", { minLength: 5, required: true })}
            />
            {errors.imagen && errors.imagen.type === "required" && (
              <p>Campo requerido</p>
            )}
            {errors.imagen && errors.imagen.type === "minLength" && (
              <p>Debe tener al menos 5 caracteres</p>
            )}
             <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              {...register("nombre", { minLength: 5, required: true })}
            />
            {errors.nombre && errors.nombre.type === "required" && (
              <p>Campo requerido</p>
            )}
            {errors.nombre && errors.nombre.type === "minLength" && (
              <p>Debe tener al menos 5 caracteres</p>
            )}
             <input
              type="text"
              name="marca"
              placeholder="Marca"
              {...register("marca", { minLength: 5, required: true })}
            />
            {errors.marca && errors.marca.type === "required" && (
              <p>Campo requerido</p>
            )}
            {errors.marca && errors.marca.type === "minLength" && (
              <p>Debe tener al menos 5 caracteres</p>
            )}
             <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              {...register("modelo", { minLength: 5, required: true })}
            />
            {errors.modelo && errors.modelo.type === "required" && (
              <p>Campo requerido</p>
            )}
            {errors.modelo && errors.modelo.type === "minLength" && (
              <p>Debe tener al menos 5 caracteres</p>
            )}
             <input
              type="number"
              name="año"
              placeholder="Año"
              {...register("año", { minLength: 4, required: true })}
            />
            {errors.año && errors.año.type === "required" && (
              <p>Campo requerido</p>
            )}
            {errors.año && errors.año.type === "minLength" && (
              <p>Debe tener al menos 5 caracteres</p>
            )}
             <input
              type="number"
              name="precio"
              placeholder="Precio"
              {...register("precio", { minLength: 2, required: true })}
            />
            {errors.precio && errors.precio.type === "required" && (
              <p>Campo requerido</p>
            )}
            {errors.precio && errors.precio.type === "minLength" && (
              <p>Debe tener al menos 5 caracteres</p>
            )}
          
            <div className="submit">
              <input type="submit" value="Crear" id="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default Alquilar
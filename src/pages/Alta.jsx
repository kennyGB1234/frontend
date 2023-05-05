import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Alta = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegar = useNavigate();

  const gestorFormulario = async (data) => {
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/usuarios", {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log("Todo correcto", response.data);
        setMostrarMensaje(true);
      })
      .catch((error) => console.log(error.response.data));
  };

  if (mostrarMensaje) {
    return (
      <div>
        <h1 className="mensajeCreado">||Usuario creado correctamente||</h1>
        {setTimeout(() => navegar("/login"), 2000)}
      </div>
    );
  }

  return (
    <div className="Form">
      <div className="title">Crea tu cuenta</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(gestorFormulario)}>
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
            name="email"
            placeholder="Email"
            {...register("email", {
              pattern:
                /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
              required: true,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p>Campo email requerido</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p>Formato de email incorrecto</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === "required" && (
            <p>Campo password requerido</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p>La contraseña debe tener como mínimo 8 caracteres</p>
          )}
          <div className="submit">
            <input type="submit" value="Crear" id="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Alta;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate(); // Navegación a través de hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const gestorFormulario = async (data) => {
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/usuarios/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Login Correcto");
      console.log(response.data);
      localStorage.setItem(
        "datosUsuario",
        JSON.stringify({
          isLoggedIn: true,
          userId: response.data.userId,
          token: response.data.token,
          email: response.data.email,
          cochesAlquilados: response.data.cochesAlquilados // Añade el array de coches alquilados del usuario
        })
      );
      setTimeout(() => {
        setLoginSuccess(true); // Actualizamos el estado de loginSuccess
        setTimeout(() => {
          setLoginSuccess(false); // Volvemos a desactivar el estado de loginSuccess después de 2 segundos
        }, 2000);
      }, 0);
      navigate("/") // Navegamos a la página de inicio
      window.location.reload() // Refrescamos la página
    } catch (error) {
      console.log(error);
    }
  };

  
 
  return (
    <div className="Form">
      <div className="title">Accede a tu cuenta</div>
      <div className="inputs">
        <form className="formita" onSubmit={handleSubmit(gestorFormulario)}>
          <div>
            <input
              type="text"
              name="email"
              placeholder="email@email.com"
              {...register("email", {
                pattern:
                  /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
              })}
              autoComplete="off"
            />
            {errors.email && errors.email.type === "required" && (
              <span> Campo requerido</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span> Formato incorrecto</span>
            )}
          </div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            autoComplete="off"
          />
          {errors.password && errors.password.type === "required" && (
            <span> Campo requerido</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span>Mínimo de 6 caracteres</span>
          )}
          <button
            type="submit"
            className={loginSuccess ? "btn-success" : ""}
            disabled={loginSuccess}
          >
            {loginSuccess ? "Logout" : "ACCESO"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

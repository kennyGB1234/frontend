import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./estiloNavbar.css";


const NavBar = () => {
  const isLoggedIn =
    localStorage.getItem("datosUsuario") &&
    JSON.parse(localStorage.getItem("datosUsuario")).isLoggedIn;

  const navegar = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("datosUsuario");
    navegar("/login");
    window.location.reload();
  };

  return (
    <div className="barra">
      <ul>
        <li>
          <NavLink to={"/"}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to={"/coches"}>Coches</NavLink>
        </li>
        <li>
          <NavLink to={"/contacto"}>Contacto</NavLink>
        </li>
        {isLoggedIn ? (
          <React.Fragment>
            <li>
              <NavLink to={"/alquilar"}>Publicar</NavLink>
            </li>
            <li>
              <NavLink to={"/solicitudes"}>Solicitudes</NavLink>
            </li>
          </React.Fragment>
        ) : (
          <li>
            <NavLink to={"/alta"}>Alta</NavLink>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("datosUsuario");
                window.location.reload();
                navegar("/");
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink to={"/login"}>
              <button className="login-btn" style={{ flexShrink: 0 }}>
                Login
              </button>
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
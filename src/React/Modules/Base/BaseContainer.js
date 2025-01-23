import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const BaseContainer = (props) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [usuarioLogged, setUsuarioLogged] = useState({});
  
    const appReducers = {};
    appReducers.home = useSelector((state) => state.home);

    const [ventana, setVentana] = useState("main")

    useEffect(() => {
      var cooki = cookies.get("ChaknuulCmUserCookiesVigency");
      if(cooki != null && cooki != "")
        {
          console.log("Session Activa hasta ->", cooki)
          var date = new Date(cooki);
          if(date < (new Date()))
          {
            cookies.remove('ChaknuulCmUserCookiesUser');
            cookies.remove('ChaknuulCmUserCookiesReference');
            cookies.remove('ChaknuulCmUserCookiesVigency');
            navigate("/login");
          }
        }
        else
        {
          let login = appReducers.home;
          if(login?.usuario)
            {
              if(login?.usuario.usuario?.ok === true){
                setUsuarioLogged(login?.usuario.usuario?.result)
              }
            }
          else
            {
              navigate("/login");
            }
        }


      
    },[])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => setVentana("main")} href="#">Chaknuul</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Eventos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Partners</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Cerrar sesion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='divBase'>
        <h4>Centro de administracion de contenido Chaknúul</h4>
        <hr></hr>
        {React.cloneElement(props.children, { ventana, setVentana })}
      </div>
    </div>
  );
}
export default BaseContainer;
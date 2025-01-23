import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestHomeModuleInfo,
} from "../../ReduxSaga/Actions/Home";
import EventsTableContainer from "./Components/EventsTableContainer";
import { useNavigate } from "react-router-dom";
import NewContainer from "./Components/NewContainer";
import EditContainer from "./Components/EditContainer";
import Cookies from "universal-cookie";

const HomeContainer = ({ventana, setVentana}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const appReducers = {};
  appReducers.home = useSelector((state) => state.home);

  const [usuarioLogged, setUsuarioLogged] = useState({});
  const [eventoSeleccionado, setEventoSeleccionado] = useState({})
  const [eventoEditar, setEventoEditar] = useState({})
  const [request, setRequest] = useState({
    referencia: "",
    data: 0
  });
  const [guid, setGuid] = useState(cookies.get("ChaknuulCmUserCookiesReference"));

  return (
    <div>
    {
      ventana == "main" &&
      <EventsTableContainer
      guid={guid}
      setVentana={setVentana}
      setEventoEditar={setEventoEditar}
      ></EventsTableContainer>
    }
    {
      ventana == "nuevo" &&
      <NewContainer
      guid={guid}
      setVentana={setVentana}
      ></NewContainer>
    }
    {
      ventana == "editar" &&
      <EditContainer
      guid={guid}
      setVentana={setVentana}
      eventoEditar={eventoEditar}
      ></EditContainer>
    }
      <div></div>
    </div>
  );
};

export default HomeContainer;
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestHomeModuleInfo,
} from "../../ReduxSaga/Actions/Home";
import EventsTableContainer from "./Components/EventsTableContainer";
import { useNavigate } from "react-router-dom";
import EventosContainer from "./Components/EventosContainer";
import NewContainer from "./Components/EventosContainer";

const HomeContainer = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appReducers = {};
  appReducers.home = useSelector((state) => state.home);

  const [usuarioLogged, setUsuarioLogged] = useState({});
  const [ventana, setVentana] = useState("main")
  const [eventoSeleccionado, setEventoSeleccionado] = useState({})
  const [request, setRequest] = useState({
    referencia: "",
    data: 0
  });
  const [guid, setGuid] = useState("");

  useEffect(() => {
    if(appReducers?.home?.usuario?.usuario?.result?.guidActivo != ""){
      setGuid(appReducers?.home?.usuario?.usuario?.result?.guidActivo);
    }
  },[appReducers?.home?.usuario?.usuario?.result?.guidActivo])

  return (
    <div>
    {
      ventana == "main" &&
      <EventsTableContainer
      setVentana={setVentana}
      ></EventsTableContainer>
    }
    {
      ventana == "nuevo" &&
      <NewContainer
      guid={guid}
      ></NewContainer>
    }
      <div></div>
    </div>
  );
};

export default HomeContainer;
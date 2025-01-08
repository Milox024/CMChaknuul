import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestHomeModuleInfo,
} from "../../ReduxSaga/Actions/Home";
import EventsTableContainer from "./Components/EventsTableContainer";
import { useNavigate } from "react-router-dom";

const HomeContainer = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appReducers = {};
  appReducers.home = useSelector((state) => state.home);

  const [usuarioLogged, setUsuarioLogged] = useState({});
  const [ventana, setVentana] = useState("main")
  const [request, setRequest] = useState({
    referencia: "",
    data: 0
  });

  return (
    <div>
      {
        ventana == "main" &&
        <EventsTableContainer></EventsTableContainer>
      }
      <div></div>
    </div>
  );
};

export default HomeContainer;
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestHomeModuleInfo } from "../../../ReduxSaga/Actions/Home";


const EventsTableContainer = () => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [usuarioLogged, setUsuarioLogged] = useState({});
    const [eventos, setEventos] = useState(null);
    const [request, setRequest] = useState({
    referencia: "",
    data: 0
    });
  
    const appReducers = {};
    appReducers.home = useSelector((state) => state.home);


    useEffect(() => {
        let login = appReducers.home;
        if(login?.usuario)
        {
            if(login?.usuario.usuario?.ok === true){
            console.log("Usuario Logged");
            setUsuarioLogged(login?.usuario.usuario?.result)
            setRequest({...request, referencia: login?.usuario.usuario?.result.guidActivo})
            }
        }
        else
        {
            console.log("no se encuentra state usuario");
            navigate("/login");
        }
    },[])
  
    useEffect(() => {
        if(appReducers.home?.eventosCM?.eventos){
            setEventos(appReducers.home?.eventosCM?.eventos.result)
            console.log("tonotos", appReducers.home?.eventosCM?.eventos.result)
        }
        console.log("Ya cayeron los eventos");
    },[appReducers.home?.eventosCM])

    useEffect(() => {
      if(request.referencia !== ""){
        dispatch(requestHomeModuleInfo(request));
      }
    },[request])

    return (
        <div>
            <div className="row">
                <div className="col-8">
                </div>
                <div className="col-4">
                    <button className="form-control mb-2">Nuevo Evento</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="customTable">
                        <tr className="tableHead">
                        <td><br></br><br></br></td>
                        <td>Fecha</td>
                        <td>Evento</td>
                        <td>Lugar</td>
                        <td>Acciones</td>
                        </tr>
                        {
                            eventos && eventos.map((e) => 
                                <tr>
                                    <td><br></br><br></br></td>
                                    <td>{e.fecha}</td>
                                    <td>{e.titulo}</td>
                                    <td>{e.lugar}</td>
                                    <td>
                                        
                                    <button
                                        onClick={() => { console.log("IdEvento", e.id) }}
                                    ><i class="fa-regular fa-pen-to-square"></i></button>
                                    &nbsp;
                                    <button><i class="fa-regular fa-copy"></i></button>
                                    &nbsp;
                                    <button><i style={{ color: "red" }} class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EventsTableContainer;
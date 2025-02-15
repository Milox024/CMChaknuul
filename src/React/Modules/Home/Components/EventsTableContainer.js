import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestHomeModuleInfo } from "../../../ReduxSaga/Actions/Home";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const EventsTableContainer = ({setVentana,setEventoEditar,guid}) => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [usuarioLogged, setUsuarioLogged] = useState({});
    const [eventos, setEventos] = useState(null);
    const [request, setRequest] = useState({
    referencia: guid,
    data: 0
    });
  
    const appReducers = {};
    appReducers.home = useSelector((state) => state.home);

    useEffect(() => {
        if(cookies.get("ChaknuulCmUserCookiesUser"))
        {
            setUsuarioLogged(cookies.get("ChaknuulCmUserCookiesUser"))
        }
        else
        {
            navigate("/login");
        }
    },[])
  
    useEffect(() => {
        if(appReducers.home?.eventosCM?.eventos){
            setEventos(appReducers.home?.eventosCM?.eventos.result)
        }
    },[appReducers.home?.eventosCM])

    useEffect(() => {
      if(request.referencia !== ""){
        dispatch(requestHomeModuleInfo(request));
      }
    },[request])

    const handleNuevoEvento = () => {
        setVentana("nuevo")
    }
    // HANDLESS    
    const getFechaFormateada = (fecha) => {
        var date = new Date(fecha);
        if(date.getFullYear() > 2100)
            {
                return "SIN FECHA"
            }
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + " Hrs" ;
    } 
    
  const handleEditarEvento = (evento) => {
    console.log("evento a editar", evento)
    setEventoEditar(evento);
    setVentana("editar")
  }
  const handleMostrarModal = (evento) => {
    Swal.fire({
        title: "Clonar '" + evento.titulo + "'",
        text: "Este evento se clonara tal cual el evento origen, solo cambiara la fecha",
        input: "datetime-local",
        inputAttributes: {
          autocapitalize: "off"
        },
        confirmButtonText: "Clonar",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: async (fecha) => {
          try 
            {
                const githubUrl = `https://services.chaknuul.com/api/Cm/CloneEvent?referencia=${guid}&fecha=${fecha}&eid=${evento.id}`;
                const response = await fetch(githubUrl);
                if (!response.ok) {
                return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                `);
                }
                return response.json();
            } 
            catch (error) 
            {
                Swal.showValidationMessage(`
                Error al clonar evento: ${error}
                `);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Se clono correctamente`,
            imageUrl: result.value.avatar_url
          });
          dispatch(requestHomeModuleInfo(request));
        }
      });
  }

  const handleUpdateStatusEvento = (evento) => {
    Swal.fire({
        title: "Actualizar Visibilidad",
        text: "Este evento pasara a " + (evento.activo ? "Oculto" : "Visible") +  " , continuar?",
        confirmButtonText: (evento.activo ? "Ocultar" : "Mostrar"),
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: async (fecha) => {
          try 
            {
                const githubUrl = `https://services.chaknuul.com/api/Cm/UpdateEventStatus?referencia=${guid}&id=${evento.id}`;
                const response = await fetch(githubUrl);
                if (!response.ok) {
                return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                `);
                }
                return response.json();
            } 
            catch (error) 
            {
                Swal.showValidationMessage(`
                Error al actualizar evento: ${error}
                `);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Se actualizo correctamente`,
            imageUrl: result.value.avatar_url
          });
          dispatch(requestHomeModuleInfo(request));
        }
      });
  }

    return (
        <div>
            <div className="row">
                <div className="col-8">
                </div>
                <div className="col-4">
                    <button onClick={() => handleNuevoEvento()} className="form-control mb-2">Nuevo Evento</button>
                </div>
            </div>
            <div className="row m-1 headTable">
                <div className="col-3">Fecha</div>
                <div className="col-3">Titulo</div>
                <div className="col-3">Lugar</div>
                <div className="col-3"></div>
            </div>
            {
                eventos && eventos.map((e, index) =>
                    {
                        return (
                            <div className="row m-1 filaTable" key={index}>
                                <div className="col-3">{getFechaFormateada(e.fecha)}</div>
                                <div className="col-3">{e.titulo}</div>
                                <div className="col-3">{e.lugar}</div>
                                <div className="col-3">
                                    <button
                                        onClick={() => { handleEditarEvento(e) }}
                                    ><i className="fa-regular fa-pen-to-square"></i></button>
                                    &nbsp;
                                    <button onClick={() => {handleMostrarModal(e)}}><i className="fa-regular fa-copy"></i></button>
                                    &nbsp;
                                    <button onClick={() => {handleUpdateStatusEvento(e)}} >
                                        {
                                            e.activo ?
                                            <i style={{ color: "blue" }} class="fa-solid fa-eye"></i>
                                            :
                                            <i style={{ color: "red" }} className="fa-solid fa-eye-slash"></i>
                                        }
                                    </button>
                                </div>
                            </div>
                        )
                    } 
                )
            }
        </div>
    )
}

export default EventsTableContainer;
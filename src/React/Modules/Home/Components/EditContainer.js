import { Fragment, useEffect, useState } from "react"
import { requestSaveOrUpdateEvent, requestClearSaveOrUpdateEvent, requestHomeModuleInfo } from "../../../ReduxSaga/Actions/Home"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'


const EditContainer = ({ guid, setVentana, eventoEditar }) => {

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal)
    const appReducers = {};
    appReducers.home = useSelector((state) => state.home);

    const [fechaEvento, setFechaEvento] = useState(new Date())
    const [evento, setEvento] = useState({
        Id: 0,
        Tipo: 0,
        Imagen: "",
        Lugar: "",
        Titulo: "",
        Subtitulo: "",
        Informacion: "",
        Objetivo: "",
        Incluye: "",
        Actividades: "",
        Itinerario: "",
        Comentarios: "",
        Llamada: "",
        Fecha: "",
        FechaCreacion: (new Date().toISOString()),
        FechaEdicion: (new Date().toISOString()),
        Foco: false,
        Activo: false
    })
    const [msgValidation, setMsgValidation] = useState("Error")
    const [imgSend, setImgSend] = useState("");
    const [dateEvent, setDateEvent] = useState("1900-01-01 00:00")
    const [timeEvent, setTimeEvent] = useState("00:00")
    const [eventoValido, setEventoValido] = useState(0);
    const [sinFecha, setSinFecha] = useState(false);

    useEffect(() => {
        setEvento(eventoEditar);
        var date = new Date(eventoEditar.fecha);
        if(date.getFullYear() > 2100)
            {
                setSinFecha(true)
            }
        else
            {
                setDateEvent(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2))
                setTimeEvent(("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2))
            }
    },[eventoEditar])

    useEffect(() => {
        document.getElementById("horaEventoId").disabled = sinFecha;
        document.getElementById("fechaEventoId").disabled = sinFecha;
        if(sinFecha)
            {
                document.getElementById("horaEventoId").value = "";
                document.getElementById("fechaEventoId").value = "";
            }
    },[sinFecha])

    useEffect(() => {
        if(eventoValido === 1){
        }
        setMsgValidation("");
    },[evento])

    useEffect(() => {
        if(eventoValido === 1)
            {
                if((Date.parse(evento.Fecha)) < (Date.now()))
                    {
                        setMsgValidation("La fecha no puede ser menor a la actual");
                        return;
                    }
                else
                    {
                        var request = {
                            referencia: guid,
                            data: evento
                        }
                        dispatch(requestSaveOrUpdateEvent(request))
                    }
            }
    },[evento.Fecha, eventoValido])

    // USE EFFECT DE STATE

    useEffect(() => {
        if(appReducers?.home?.AddOrUpdateEvent?.eventos?.ok)
        {
            dispatch(requestClearSaveOrUpdateEvent());
            let timerInterval;
            Swal.fire({
                title: "Se actualizo correctamente!",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {},
                willClose: () => {
                    clearInterval(timerInterval);
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                }
            });
            setVentana("main");
        }
    },[appReducers?.home?.AddOrUpdateEvent])

    // USE EFFECT DE STATE

    const handleValidateEvent = () => {
        if(evento.Tipo === 0)
            {
                setMsgValidation("El campo tipo es obligatorio");
                return;
            }
        if(evento.Titulo === "")
            {
                setMsgValidation("El campo Titulo es obligatorio");
                return;
            }
        if(evento.Subtitulo === "")
            {
                setMsgValidation("El campo Subtitulo es obligatorio");
                return;
            }
        if(evento.Imagen === "")
            {
                setMsgValidation("El campo Imagen es obligatorio");
                return;
            }
        if(!sinFecha)
            {
                if(dateEvent.includes("1900"))
                    {
                        setMsgValidation("Capture el campo Fecha");
                        return;
                    }
                if(timeEvent.includes("00:00"))
                    {
                        setMsgValidation("Capture el campo Hora");
                        return;
                    }
            }
        if(evento.Lugar === "")
            {
                setMsgValidation("El campo Lugar es obligatorio");
                return;
            }
        if(evento.Informacion === "")
            {
                setMsgValidation("El campo Informacion es obligatorio");
                return;
            }
        if(evento.Llamada === "")
            {
                setMsgValidation("El campo Llamada es obligatorio");
                return;
            }
        if(!sinFecha)
            {
                setEvento({...evento, Fecha: dateEvent + "T" + timeEvent});
            }
            else
            {
                setEvento({...evento, Fecha: "2999-01-01T00:00"})
            }
        setEventoValido(1);
    }


    // HANDLESS    
    const getFechaFormateada = (fecha) => {
        var date = new Date(fecha);
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) ;
    }   

    const handleCargaImagen = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setImgSend(e.target.result)
            setEvento({...evento, imagen: e.target.result})
        }
    }

    return (
        <div className="px-2">
            <h5>Datos del Evento</h5>
            <div>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Tipo</label>
                            <select onChange={(e) => setEvento({...evento, tipo: e.target.value})} className="form-control">
                                <option value={0}>Seleccione</option>
                                <option selected={evento.tipo == 1} value={1}>Clase</option>
                                <option selected={evento.tipo == 2} value={2}>Viaje</option>
                                <option selected={evento.tipo == 3} value={3}>Eventos</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group">
                            <label >Titulo</label>
                            <input value={evento.titulo} onChange={(e) => setEvento({...evento, titulo: e.target.value})} type="text" className="form-control" placeholder="Titulo del evento"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label >Sub Titulo</label>
                            <input value={evento.subtitulo} onChange={(e) => setEvento({...evento, subtitulo: e.target.value})} type="text" className="form-control" placeholder="Descripcion corta para la vista previa"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1">Imagen</label>
                            <input type="file" id="imgLoader" accept=".png" onChange={(e) => handleCargaImagen(e)} className="form-control filetype m-1" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label >Fecha</label>
                            <input id="fechaEventoId" value={dateEvent} onChange={(e) => {setDateEvent(e.target.value)}} type="date" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label >Hora</label>
                            <input id="horaEventoId" value={timeEvent} onChange={(e) => {setTimeEvent(e.target.value)}} type="time" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <br></br>
                            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                <input onChange={(e)=>{ setSinFecha(e.target.checked) }} checked={sinFecha} type="checkbox" className="btn-check" id="btncheck1" />
                                <label className="btn btn-outline-danger" htmlFor="btncheck1">Sin Fecha</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label >Lugar</label>
                            <input value={evento.lugar} onChange={(e) => setEvento({...evento, lugar: e.target.value})} type="text" className="form-control" placeholder="Zona del evento"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Información</label>
                    <textarea value={evento.informacion} onChange={(e) => setEvento({...evento, informacion: e.target.value})} className="form-control" rows="3" placeholder="Descripcion que se mostrara al desplegar detalle del evento"></textarea>
                </div>
                <div className="form-group">
                    <label>Objetivo(s)</label>
                    <textarea value={evento.objetivo} onChange={(e) => setEvento({...evento, objetivo: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Incluye</label>
                    <textarea value={evento.incluye} onChange={(e) => setEvento({...evento, incluye: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Actividades</label>
                    <textarea value={evento.actividades} onChange={(e) => setEvento({...evento, actividades: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Itinerario</label>
                    <textarea value={evento.itinerario} onChange={(e) => setEvento({...evento, itinerario: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Comentarios</label>
                    <textarea value={evento.comentarios} onChange={(e) => setEvento({...evento, comentarios: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Llamada a la accion</label>
                    <textarea value={evento.llamada} onChange={(e) => setEvento({...evento, llamada: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <br></br>    
                {
                    msgValidation != "" ?
                        <div id="div-validation" className="alert alert-danger" role="alert">
                            {msgValidation}
                        </div>
                        :
                        <Fragment></Fragment>

                }
                <button className="btn btn-primary flex-end" onClick={() => handleValidateEvent()}>Actualizar Evento</button>
            </div>
        </div>
    )
    }

export default EditContainer;
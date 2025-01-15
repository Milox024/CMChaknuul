import { Fragment, useEffect, useState } from "react"
import { requestSaveOrUpdateEvent } from "../../../ReduxSaga/Actions/Home"
import { useDispatch } from "react-redux"


const NewContainer = ({ guid }) => {

    const dispatch = useDispatch();

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
        Foco: false
    })
    const [msgValidation, setMsgValidation] = useState("Error")
    const [imgSend, setImgSend] = useState("");
    const [dateEvent, setDateEvent] = useState("1900-01-01 00:00")
    const [timeEvent, setTimeEvent] = useState("00:00")
    const [eventoValido, setEventoValido] = useState(0);

    useEffect(() => {
        console.log("Evento", evento);
        if(eventoValido === 1){
            console.log("Evento Valido y Listo");
        }
        setMsgValidation("");
    },[evento])

    useEffect(() => {
        //console.log("Evento Valido", eventoValido)
        if(eventoValido === 1)
            {
                //console.log("Validadndo fecha de evento", Date.parse(evento.Fecha))
                if((Date.parse(evento.Fecha)) < (Date.now()))
                    {
                        //console.log("Validadndo fecha en curso", Date.now())
                        setMsgValidation("La fecha no puede ser menor a la actual");
                        return;
                    }
                else
                    {
                        var request = {
                            referencia: guid,
                            data: evento
                        }
                        console.log("Request ", request);
                        dispatch(requestSaveOrUpdateEvent(request))
                    }
            }
    },[evento.Fecha, eventoValido])

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

        setEvento({...evento, Fecha: dateEvent + "T" + timeEvent});
        setEventoValido(1);
        console.log("Evento Validado :D")
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
            console.log("e.target.result", e.target.result)
            setEvento({...evento, Imagen: e.target.result})
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
                            <select onChange={(e) => setEvento({...evento, Tipo: e.target.value})} className="form-control">
                                <option value={0}>Seleccione</option>
                                <option value={1}>Clase</option>
                                <option value={2}>Viaje</option>
                                <option value={3}>Eventos</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group">
                            <label >Titulo</label>
                            <input onChange={(e) => setEvento({...evento, Titulo: e.target.value})} type="text" className="form-control" placeholder="Titulo del evento"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label >Sub Titulo</label>
                            <input onChange={(e) => setEvento({...evento, Subtitulo: e.target.value})} type="text" className="form-control" placeholder="Descripcion corta para la vista previa"/>
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
                    <div className="col-2">
                        <div className="form-group">
                            <label >Fecha</label>
                            <input onChange={(e) => {setDateEvent(e.target.value)}} type="date" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label >Hora</label>
                            <input onChange={(e) => {setTimeEvent(e.target.value)}} type="time" min="09:00" max="18:00" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group">
                            <label >Lugar</label>
                            <input onChange={(e) => setEvento({...evento, Lugar: e.target.value})} type="text" className="form-control" placeholder="Zona del evento"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Información</label>
                    <textarea onChange={(e) => setEvento({...evento, Informacion: e.target.value})} className="form-control" rows="3" placeholder="Descripcion que se mostrara al desplegar detalle del evento"></textarea>
                </div>
                <div className="form-group">
                    <label>Objetivo(s)</label>
                    <textarea onChange={(e) => setEvento({...evento, Objetivo: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Incluye</label>
                    <textarea onChange={(e) => setEvento({...evento, Incluye: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Actividades</label>
                    <textarea onChange={(e) => setEvento({...evento, Actividades: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Itinerario</label>
                    <textarea onChange={(e) => setEvento({...evento, Itinerario: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Comentarios</label>
                    <textarea onChange={(e) => setEvento({...evento, Comentarios: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
                </div>
                <div className="form-group">
                    <label>Llamada a la accion</label>
                    <textarea onChange={(e) => setEvento({...evento, Llamada: e.target.value})} className="form-control" rows="3" placeholder="En caso que sean mas de un elemento, separar por un asterisco (*), si se guarda vacio no se mostrara este campo"></textarea>
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
                <button className="btn btn-primary flex-end" onClick={() => handleValidateEvent()}>Guardar Evento</button>
            </div>
        </div>
    )
    }

export default NewContainer;
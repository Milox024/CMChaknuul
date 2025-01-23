import { Fragment, useEffect, useState } from "react"

import { requestUserLogin } from "../../ReduxSaga/Actions/Home"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"



const LoginContainer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const appReducers = {};
    appReducers.home = useSelector((state) => state.home);
    const [errorMsg, setErrorMsg] = useState("");
    const [user, setUser] = useState({
        "usuario":"",
        "password":""
    })
    const [userService, setUserService] = useState({
        "usuario":"",
        "password":""
    })

    useEffect(() => {
        //Autologin para pruebas
    },[])


    useEffect(() => {
        let login = appReducers.home;
        if(login.usuario)
            {
                if(login?.usuario?.usuario.ok == true)
                    {
                        var fecha = new Date();
                        fecha.setHours(fecha.getHours() + 1);
                        console.log("fecha", getFechaFormateada(fecha));
                        cookies.set("ChaknuulCmUserCookiesUser", login?.usuario.usuario?.result);
                        cookies.set("ChaknuulCmUserCookiesReference", login?.usuario.usuario?.result?.guidActivo);
                        cookies.set('ChaknuulCmUserCookiesVigency', getFechaFormateada(fecha));
                        navigate("/");
                    }
                else
                    {
                        setErrorMsg("Usuario y/o Contraseña Incorrecta")
                    }
            }
      },[appReducers.home?.usuario])

    useEffect(() => {
        if(userService.usuario !== "" || userService.password !== "")
            {
                dispatch(requestUserLogin(userService));
            }
    }, [userService])
    useEffect(() => {
        setErrorMsg("");
    },[user])

    const handleLogin = async () => {
        if(user.usuario === "" || user.tmp === "")
            {
                setErrorMsg("Se requiere usuario y contraseña")
                return;
            }
        var hash = "";
        if(user.tmp == "acebuche")
        {
            hash = "0d7c831db047345a5e3ae9f1ff4d3399142a01c6b287ff684a4227b631783ea5";
        }
        else
        {
            hash = "0d7c831db047345a5e3ae9f1ff4d3399142a01c6b287ff684a4227fj3hfd783ea5";
        }

        setUserService({ ...userService, usuario: user.usuario, password: hash })
    }

    const getFechaFormateada = (fecha) => {
        var date = new Date(fecha);
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) ;
    }   

    return (
        <div className="loginBackground">
            <div className="loginForm">
                <div className="row text-center">
                    <div className="col-12 px-2"><img src="chaknuul-logo.svg" style={{ width: 300 }}></img></div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <input onChange={(e) => setUser({ ...user, usuario: e.target.value }) } placeholder="Usuario" className="form-control" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                    <input onChange={(e) => setUser({ ...user, tmp: e.target.value }) } placeholder="Contraseña" className="form-control" type="password"></input>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <button onClick={() => handleLogin()} className="form-control">Login</button>
                    </div>
                </div>
                <br></br>
                {
                    errorMsg !== "" &&
                    <div className="alert alert-danger" role="alert">
                        {errorMsg}
                    </div>
                }
                
            </div>
        </div>
    )
}

export default LoginContainer;
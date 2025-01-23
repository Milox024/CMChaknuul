
const URLServices = "http://chaknuul-001-site1.anytempurl.com/api/";
//const URLServices = "https://localhost:44305/api/";


class HomeModule {

    static async RequestUserLogin(user) {
      var response = 
      {
        code: 200
      };
      await fetch(URLServices + "login/login",{
        method: "POST",
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json;charset=UTF-8"}
      })
        .then((response) => response.json())  
          .then((usuario) => {
            response.usuario = usuario;
          }
      );
      return response;
    }
    static async GetHomeModule(request) {
      var response = 
      {
        code: 200
      };
      await fetch(URLServices + "CM/GetEventsAdmin",{
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-type": "application/json;charset=UTF-8"}
      })
        .then((response) => response.json())  
          .then((usuario) => {
            response.eventos = usuario;
          }
      );
      return response;
    }
    static async RequestSaveOrUpdateEvent(request) {
      var response = 
      {
        code: 200
      };
      await fetch(URLServices + "CM/AddOrUpdateEvent",{
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-type": "application/json;charset=UTF-8"}
      })
        .then((response) => response.json())  
          .then((usuario) => {
            response.eventos = usuario;
          }
      );
      return response;
    }
    static async RequestUpdateStatusEvent(request) {
      var response = 
      {
        code: 200
      };
      await fetch(URLServices + "CM/UpdateEventStatus",{
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-type": "application/json;charset=UTF-8"}
      })
        .then((response) => response.json())  
          .then((usuario) => {
            response.eventos = usuario;
          }
      );
      return response;
    }
  }
  
  export default HomeModule
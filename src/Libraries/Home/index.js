
const URLServices = "http://chaknuul-001-site1.anytempurl.com/api/";
const URLServicesDev = "https://localhost:44305/api/";


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
      console.log(response)
      return response;
    }
    static async GetHomeModule(guid) {
      var response = 
      {
        code: 200
      };
      await fetch(URLServices + "CM/GetEventsAdmin",{
        method: "POST",
        body: JSON.stringify(guid),
        headers: {"Content-type": "application/json;charset=UTF-8"}
      })
        .then((response) => response.json())  
          .then((usuario) => {
            response.eventos = usuario;
          }
      );
      console.log(response)
      return response;
    }
  }
  
  export default HomeModule
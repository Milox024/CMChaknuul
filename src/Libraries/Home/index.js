class HomeModule {
    static async GetHomeModule() {
      var response = 
      {
        code: 100
      };
      await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        .then((response) => response.json())  
          .then((pok) => {
            response.pokemon = pok;
          }
        );
      return response;
    }
  }
  
  export default HomeModule
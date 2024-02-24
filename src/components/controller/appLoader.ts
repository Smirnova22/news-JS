interface EnvironmentVariables {
    API_URL: string;
    API_KEY?: string;
  }
  
  declare const process: {
    env: EnvironmentVariables;
  };

  


  import Loader from './loader';

  class AppLoader extends Loader {
    constructor() {
      super(process.env.API_URL, {
        apiKey: process.env.API_KEY,
      });
    }
  }
  
  export default AppLoader;
  

import Loader from './loader';

const checkApiData = (apiUrl: string | undefined, apiKey: string | undefined): { apiKey: string; apiUrl: string } => {
  if (!apiKey) {
    throw new Error('API key is not defined. Please set the API_KEY environment variable.');
  }

  if (!apiUrl) {
    throw new Error('API URL is not defined. Please set the API_URL environment variable.');
  }

  return {
    apiKey,
    apiUrl,
  };
};

class AppLoader extends Loader {
  constructor() {
    const { apiKey, apiUrl } = checkApiData(process.env.API_URL, process.env.API_KEY);
    super(apiUrl, {
      apiKey,
    });
  }
}

export default AppLoader;

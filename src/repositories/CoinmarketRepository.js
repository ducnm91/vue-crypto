import Client from './Clients/AxiosClient';
const API_KEY = '8b7b3829-4819-4b59-8396-44bf5c23dc43';
const baseDomain = 'https://pro-api.coinmarketcap.com/v1';
export default {
  getCategories() {
    return Client.get(`${baseDomain}/cryptocurrency/categories`,
    {
      headers: {
        'CMC_PRO_API_KEY': API_KEY,
        'X-CMC_PRO_API_KEY': API_KEY
      },
    });
  }
};

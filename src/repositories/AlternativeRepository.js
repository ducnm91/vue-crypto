import Client from './Clients/AxiosClient';
const baseDomain = 'https://api.alternative.me';
export default {
  getFearGreed(limit = 15) {
    return Client.get(`${baseDomain}/fng?limit=${limit}`);
  }
};

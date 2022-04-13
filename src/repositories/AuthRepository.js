import Client from './Clients/AxiosClient';
const resource = '/posts';
export default {
    login(email, password) {
        return Client.post(`/users/login`, {
            email,
            password
        }).catch(error => {
            console.log(error)
        });
    }
}
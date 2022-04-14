import Client from './Clients/AxiosClient';
const resource = 'http://localhost:3000';
export default {
    login(email, password) {
        return Client.post(`${resource}/users/login`, {
            email,
            password
        }).catch(error => {
            console.log(error)
        });
    }
}
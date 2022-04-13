import { io } from "socket.io-client";
import config from "../config"

let socket
export const socketService = {
    connect() {
        if(!socket) {
            socket = io(config.socket_url, {
                query: {
                    auth: 'aspm2tavjg99453viaw67q'
                }
            })
            socket.on('connect', () => {
                console.log('socket is connect')
            })

            socket.on('connect_error', (err) => {
                console.log('socket is connect_error', err)
            })

            socket.on('reconnect', () => {
                console.log('socket is reconnect')
            })
        }
        return socket
    },
    disconnect() {
        if (socket && socket.connected) {
            socket.disconnect()
        }
        socket = null
    }
}

export default {
    ...socketService
}
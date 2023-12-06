
import {connect,disconnect} from "../../socket/socket"

    const socketMiddleware=store=>next=>action=>{
        switch(action.type){
            case 'CONNECT_SOCKET':
                connect();
                break;
            case 'DISCONNECT_SOCKET':
                disconnect();
                break;
            default:
                break;
        }

        return next(action);
    }

    export default socketMiddleware;
const initialState={
    insConnected:false
};

const socketReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'CONNECT_SOCKET':
            return{...state,isConnected:true};
        case 'DISCONNECT_SOCKET':
            return{...state,isConnected:false};
        default:
            return state;
    }
};


export default socketReducer;
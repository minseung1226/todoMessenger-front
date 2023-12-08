import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const CreateChatModal=({show,onClose,onCreate})=>{
    const [roomName,setRoomName]=useState('');
    
    const handleCreate=()=>{
        onCreate(roomName);
        setRoomName(``);
        onClose();
    }
    if(!show) return null;

    return(
        <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          placeholder="채팅방 이름"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={handleCreate}>채팅방 만들기</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
    )

    
}

export default CreateChatModal;
import React,{useState} from "react";
import Modal from "react-modal";
import "./AlertModal.css";
const AlertModal=({message,isOpen,onClose})=>{

    return (
        <div>
            <Modal
            className="alert-modal"
            isOpen={isOpen}
            contentLabel="알림"
            onRequestClose={onClose}
            >
            <h2>알림</h2>
            <div>{message}</div>
            <button onClick={onClose}>닫기</button>
            </Modal>
        </div>
    )
}

export default AlertModal;
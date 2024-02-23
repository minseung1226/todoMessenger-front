import React from 'react'
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import './InputField.css'
const InputField = ({message,setMessage,sendMessage}) => {

  return (
    <div className="chat-area">
          <form onSubmit={sendMessage} className="input-container">
            <Input
              placeholder="Type in here…"
              className="chat-input"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              
                multiline={false}
              rows={1}
            />

          </form>
        </div>
  )
}

export default InputField
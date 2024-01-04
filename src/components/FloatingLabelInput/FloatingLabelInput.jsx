import { Form,FloatingLabel } from "react-bootstrap";
import "./FloatingLabelInput.css";
const FloatingLabelInput=({label,onChange})=>{

    return (           
         <FloatingLabel label={label} className="id-control mb-2">
            <Form.Control type="text"
                onChange={onChange}/>
         </FloatingLabel>)
}

export default FloatingLabelInput;




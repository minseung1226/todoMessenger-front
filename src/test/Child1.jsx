import { useEffect } from "react";

const Child1=()=>{
    useEffect(()=>{
        console.log("실행");
    },[])
    return(
        <div>
            자식1
        </div>
    )
}
export default Child1;
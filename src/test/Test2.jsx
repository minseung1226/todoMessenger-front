import { Link, Route, Routes,useLocation} from "react-router-dom";
import { useEffect } from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";
const Test2=()=>{
    const location = useLocation();

    useEffect(() => {
      console.log("현재 경로:", location.pathname);
    }, [location]);
    return(
        <div>
            <Link to="/test2">자식1</Link>
            <Link to="/test2/child2">자식2</Link>
            <strong>상위 컴포넌트2</strong>
            <Routes>
            <Route path="" element={<Child1/>}/>
            <Route path="child2" element={<Child2/>}/>
            </Routes>
            
        </div>
    )
}

export default Test2;
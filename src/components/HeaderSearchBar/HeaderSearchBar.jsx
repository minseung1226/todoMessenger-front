import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, Col, Form,Image, Row } from "react-bootstrap";
import "./HeaderSearchBar.css";
import SearchInput from '../searchInput/SearchInput';
//import { BsX } from 'react-icons/bs';
const HeaderSearchBar = ({ title,children,allData, setSearchResult }) => {

    const [showSearchInput, setShowSearchInput] = useState(false);
    //친구 검색
    // const dataSearch = (event) => {
    //     setSearchInput(event.target.value);
    //     let searchName = event.target.value;

    //     if (!searchName) {
    //         setSearchResult(allData);
    //         return;
    //     }
    //     const lastCharCode = searchName.charCodeAt(searchName.length - 1);
    //     if ((lastCharCode >= 0x3131 && lastCharCode <= 0x314E) ||
    //         (lastCharCode >= 0x314F && lastCharCode <= 0x3163)) {
    //         if (searchName.length <= 1) {
    //             setSearchResult(allData);
    //         }
    //         searchName = searchName.slice(0, -1);

    //     }
    //     setSearchResult(allData.filter(data => data.name.includes(searchName)));
    //  }

    return (
        <div>
            <Row className="align-items-center mb-2">
                <Col xs={6} className="d-flex align-items-center">
                    <h4>{title}</h4>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center right-content">
                    <Image src="/search.png" className="search-img icon-img" onClick={() => setShowSearchInput(true)} />
                    {children}
                </Col>
            </Row>
            
            {showSearchInput &&
            <SearchInput allData={allData} setSearchResult={setSearchResult} onClose={() => setShowSearchInput(false)}/>
            // <Row>
            //     <Col xs={10}>
            //         <Form.Control type="text" placeholder="검색" value={searchInput}
            //              onChange={dataSearch}
            //         /></Col>
            //     <Col xs={2}>
            //         <Image src="/close.png" className="close-img" onClick={() => setShowSearchInput(false)} />
            //     </Col>
            // </Row>
            }
        </div>
    )
}

export default HeaderSearchBar;
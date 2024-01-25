import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, Col, Form,Image, Row } from "react-bootstrap";
import "./HeaderSearchBar.css";
import SearchInput from '../searchInput/SearchInput';
//import { BsX } from 'react-icons/bs';
const HeaderSearchBar = ({ title,children,allData, setSearchResult }) => {

    const [showSearchInput, setShowSearchInput] = useState(false);

    return (
        <div>
            <Row className="align-items-center mb-2 header-container">
                <Col xs={6} className="d-flex align-items-center">
                    <h5><strong className='m-2'>{title}</strong></h5>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center right-content">
                    <Image src="/search.png" className="search-img icon-img" onClick={() => setShowSearchInput(true)} />
                    {children}
                </Col>
            </Row>
            
            {showSearchInput &&
            <SearchInput allData={allData} setSearchResult={setSearchResult} onClose={() => setShowSearchInput(false)}/>

            }
        </div>
    )
}

export default HeaderSearchBar;
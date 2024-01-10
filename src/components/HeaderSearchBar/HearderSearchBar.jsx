import { useState } from "react";
import { Row, Col, Image, Form,InputGroup,Button,FormControl } from "react-bootstrap"
import "../../styles/common.css"
import "./HeaderSearchBar.css"
import { BsX } from 'react-icons/bs';
const HeaderSearchBar = ({ title, allData, setSearchResult, children }) => {
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    //친구 검색
    const dataSearch = (event) => {
        setSearchInput(event.target.value);
        let searchName = event.target.value;

        if (!searchName) {
            setSearchResult(allData);
            return;
        }
        const lastCharCode = searchName.charCodeAt(searchName.length - 1);
        if ((lastCharCode >= 0x3131 && lastCharCode <= 0x314E) ||
            (lastCharCode >= 0x314F && lastCharCode <= 0x3163)) {
            if (searchName.length <= 1) {
                setSearchResult(allData);
            }
            searchName = searchName.slice(0, -1);

        }
        setSearchResult(allData.filter(data => data.name.includes(searchInput)));
    }

    return (
        <div>
            <Row className="align-items-center mb-2">
                <Col md={6} className="d flex align-items-center">
                    <h4>{title}</h4>
                </Col>
                <Col md={6} className="d-flex justify-content-end align-items-center">
                    <Image src="/search.png" className="search-img icon-img" onClick={() => setShowSearchInput(true)} />
                    {children}
                </Col>
            </Row>
            {showSearchInput &&<InputGroup className="mb-3">
      <FormControl
        placeholder="검색어 입력"
        value={searchInput}
        onChange={dataSearch}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={() => setShowSearchInput(false)}>
          <BsX /> {/* X 아이콘 */}
        </Button>
      </InputGroup.Append>
    </InputGroup>}
            {/* {showSearchInput && <Row>
                <Col md={10}>
                    <Form.Control type="text" placeholder="검색" value={searchInput}
                        onChange={dataSearch}
                    /></Col>
                <Col md={2}>
                    <Image src="/close.png" className="close-img" onClick={() => setShowSearchInput(false)} />
                </Col>
            </Row>
            } */}
        </div>
    )
}

export default HeaderSearchBar;
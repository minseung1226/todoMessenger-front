import { useState } from "react";
import { Row, Col, Form, Image } from "react-bootstrap";
import "../../styles/common.css";
import "./SearchInput.css"
const SearchInput = ({ allData, setSearchResult}) => {
    const [searchInput, setSearchInput] = useState("");

    const dataSearch = (event) => {
        setSearchInput(event.target.value);
        let searchName = event.target.value.trim();

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
        setSearchResult(allData.filter(data => data.name.includes(searchName)));
    }
    return (
        <Row className="search-container">
            <Col>
                <Form.Control type="text" placeholder="검색" value={searchInput}
                    onChange={dataSearch}
                />
            </Col>
            {/* {onClose &&
                <Col xs={1} className="close-col">

                    <Image src="/close.png" className="close-img img" onClick={onClose} />
                </Col>} */}
        </Row>
    )
}

export default SearchInput;
import { useEffect, useState } from "react";
import { getSocket } from "../../socket/socket";
import { Container, Image, Row, Col, Form, Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./ProfileUpdatePage.css"
const ProfileUpdatePage = () => {
    const token = localStorage.getItem("jwtToken");
    const [user, setUser] = useState("");
    const socket = getSocket(token);
    const [name, setName] = useState("");
    const [profileImg,setProfileImg]=useState("");

    const profileImgChange = () => {

    }

    useEffect(() => {
        socket.emit("findUser", token, (res) => {
            setUser(res.user);
            setName(res.user.name);
            if(profileImg){
                setProfileImg(process.env.REACT_APP_PROFILE_IMG_URL+res.user.profileImg);
            }
        });
    }, [socket, token]);


    return (
        <Container fluid>
            <h4 className="mt-2">프로필 변경</h4>
            <Row className="mt-4 mb-3">
                <Col className="d-flex justify-content-center">
                    <div className="profile-img-div">
                        <Image roundedCircle src={profileImg||"/profile.jpeg"} className="my-profile-img"/>
                        <Dropdown alignRight className="img-change-dropdown">
                            <Dropdown.Toggle id="dropdown-basic" className="img-change-toggle" style={{ padding: 0, border: 'none', backgroundColor: 'transparent' }}>
                                <Image src="/camera.png" className="camera-img" /> {/* 여기서 원하는 이미지를 넣으세요 */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-dropdown-menu">
                                <Dropdown.Item as="div" size="sm">
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label 
                                        htmlFor="hidden-file-input"
                                        className="file-input-label"
                                        >이미지 선택</Form.Label>
                                        <Form.Control type="file"
                                            id="hidden-file-input"
                                            style={{ display: 'none' }}
                                            onChange={profileImgChange} />
                                    </Form.Group>

                                </Dropdown.Item>
                                <Dropdown.Item >기본 이미지</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
            </Row >
            <Row className="mt-2 mb-3">
                <Col xs={1}></Col>
                <Col className="d-flex justify-content-center">
                    <Form.Control
                        type="text"
                        placeholder="이름"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </Col>
                <Col xs={1}></Col>
            </Row >
            <Row>
                <Col>
                    <div style={{ height: "90px" }}></div>
                </Col>
            </Row>
            <Row className="mt-2 mb-2">
                <Col xs={1}></Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="outline-dark">비밀번호 변경</Button>
                </Col>
                <Col xs={1}></Col>
            </Row>

            <Row className="mb-3">
                <Col xs={1}></Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="outline-dark" style={{ marginRight: "8px" }}>확인</Button>
                    <Button variant="outline-dark">닫기</Button>
                </Col>
                <Col xs={1}></Col>
            </Row>

        </Container>
    )
}

export default ProfileUpdatePage;
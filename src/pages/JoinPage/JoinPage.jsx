import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image, Button, Row, Col } from "react-bootstrap";
import AlertModal from "../../components/AlertModal/AlertModal";
import "./JoinPage.css"
import { Input } from "@mui/base";
const server_url = process.env.REACT_APP_SERVER_URL;

const JoinPage = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate("");
    const [idCheck, setIdCheck] = useState(false);
    const [codeCheck, setCodeCheck] = useState(false);
    const [code, setCode] = useState("");
    const [realCode, setRealCode] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const idDuplication = () => {
        fetch(`${server_url}/idDuplication`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                loginId: id,
            })
        })
            .then((res) => res.json())
            .then(data => {
                if (!data.ok) alert("중복 ID")
                else {
                    alert("사용 가능한 아이디 입니다.");
                    setIdCheck(true);

                }

            }).catch(err => console.log(err.message));
    }

    const verfificationCodeSend = () => {
        fetch(`${server_url}/sendCode`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        })
            .then((res) => res.json())
            .then((data) => {
                alert("인증번호 발송");
                setRealCode(data.code);
            })
    }

    const codeValid = () => {
        if (realCode != code || !code) {
            alert("인증번호가 일치하지 않음");
        }
        else {
            alert("인증성공");
            setCodeCheck(true);
        }
    }


    const join = (event) => {
        event.preventDefault();
        fetch(`${server_url}/join`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                loginId: id,
                pw: pw,
                name: name,
                phoneNumber: phoneNumber,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    if (window.confirm("회원가입 성공")) {
                        navigate("/");
                    }
                }
            })
            .catch((err) => console.log(err.message));
    }



    return (
        <div className="join-body">
            <div className="join-wrapper">
                {/* <div className="logo">
                <Image src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
            </div> */}
                <div className="text-center mt-4 name">
                    Join
                </div>
                <form onSubmit={join} className="p-3 mt-3">
                    <Row>
                        <Col>
                            <div className="form-field d-flex align-items-center">
                                <span className="far fa-user"></span>
                                <Form.Control
                                    placeholder="이름"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>
                            <div className="form-field d-flex align-items-center">
                                <span className="far fa-user"></span>
                                <Form.Control
                                    value={id}
                                    disabled={idCheck}
                                    onChange={(event) => setId(event.target.value)}
                                    placeholder="ID" />
                            </div>
                        </Col>
                        <Col xs={3}>
                            <Button variant="outline-dark"
                                className="btn sm-btn"
                                disabled={idCheck}
                                onClick={idDuplication}>중복확인</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <Form.Control type="password"
                                    value={pw}
                                    onChange={(event) => setPw(event.target.value)}
                                    id="pwd" placeholder="비밀번호" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <Form.Control type="password"
                                    placeholder="비밀번호 확인" />
                            </div>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={8}>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <Form.Control placeholder="핸드폰 번호 - 제외"
                                    value={phoneNumber}
                                    disabled={codeCheck}
                                    onChange={(event) => setPhoneNumber(event.target.value)} />
                            </div>
                        </Col>

                        <Col xs={4}>
                            <Button variant="outline-dark"
                                className="btn sm-btn"
                                onClick={verfificationCodeSend}
                                disabled={codeCheck}>인증번호 발송</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={8}>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <Form.Control placeholder="인증번호"
                                    value={code}
                                    disabled={codeCheck}
                                    onChange={(event) => {
                                        setCode(event.target.value)
                                    }} />
                            </div>
                        </Col>

                        <Col xs={4}>
                            <Button onClick={codeValid}
                                variant="outline-dark"
                                className="btn sm-btn">인증</Button>
                        </Col>
                    </Row>
                    <Button type="submit"
                        className="submit-btn"
                        disabled={!idCheck || !codeCheck}
                        variant="outline-dark">Login</Button>

                </form>
                <div className="text-center fs-6">
                    <a href="#">id/pw 찾기</a> or <a href="#" onClick={() => navigate("/")}>로그인</a>
                </div>
                <AlertModal
                    isOpen={alertIsOpen}
                    message={alertMessage}
                    onClose={() => setAlertIsOpen(false)} />


            </div>
        </div>
    )
}


export default JoinPage;
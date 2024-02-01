import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image, Button, Row, Col } from "react-bootstrap";
import AlertModal from "../../components/AlertModal/AlertModal";
import "./JoinPage.css"
import { Input } from "@mui/base";
import WindowControl from "../../components/WindowControl/WindowControl";
const server_url = process.env.REACT_APP_SERVER_URL;

const JoinPage = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate("");
    const [idCheck, setIdCheck] = useState(false);
    const [codeCheck, setCodeCheck] = useState(false);
    const [code, setCode] = useState("");
    const [realCode, setRealCode] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [joinSuccess, setJoinSuccess] = useState(false);
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
                if (!data.ok) {
                    setAlertMessage("중복된 아이디 입니다.");
                    setAlertIsOpen(true);
                }
                else {
                    setAlertMessage("사용 가능한 ID 입니다.");
                    setAlertIsOpen(true);
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
                setAlertMessage("인증번호가 발송되었습니다.");
                setAlertIsOpen(true);
                setRealCode(data.code);
            })
    }

    const codeValid = () => {
        if (realCode != code || !code) {
            setAlertMessage("인증번호가 일치하지 않습니다.");
            setAlertIsOpen(true);
        }
        else {
            setAlertMessage("인증 완료");
            setAlertIsOpen(true);
            setCodeCheck(true);
        }
    }


    const join = (event) => {
        event.preventDefault();
        if(pw!==pw2){
            setAlertMessage("비밀번호가 일치하지 않습니다.")
            setAlertIsOpen(true);
            return;
        }
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
                    setAlertMessage("회원가입 되셨습니다.");
                    setAlertIsOpen(true);
                    setJoinSuccess(true);
                }
            })
            .catch((err) => console.log(err.message));
    }

    const alertModalOnClose = () => {
        setAlertIsOpen(false);
        if (joinSuccess) navigate("/");
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
                        <Col xs={8}>
                            <div className="form-field d-flex align-items-center">
                                <span className="far fa-user"></span>
                                <Form.Control
                                    value={id}
                                    disabled={idCheck}
                                    onChange={(event) => setId(event.target.value)}
                                    placeholder="ID" />
                            </div>
                        </Col>
                        <Col xs={4}>
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
                                     placeholder="비밀번호" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <Form.Control type="password"
                                value={pw2}
                                onChange={(event) => setPw2(event.target.value)}
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
                                className="btn sm-btn long-text"
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
                        variant="outline-dark">회원 가입</Button>

                </form>
                <div className="text-center fs-6">
                    <a href="#">id/pw 찾기</a> or <a href="#" onClick={() => navigate("/")}>로그인</a>
                </div>
                <AlertModal
                    isOpen={alertIsOpen}
                    message={alertMessage}
                    onClose={alertModalOnClose} />


            </div>
        </div>
    )
}


export default JoinPage;
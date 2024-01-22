import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Form, Button } from "react-bootstrap";
import { connect } from "../../socket/socket";
import "./LoginPage.css"
import AlertModal from "../../components/AlertModal/AlertModal"
const LoginPage = () => {
    const server_url = process.env.REACT_APP_SERVER_URL;
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const navigate = useNavigate();

    const login = (event) => {

        event.preventDefault();
        fetch(`${server_url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                loginId: id,
                pw: pw
            }),
        })
            .then((res) => res.json())
            .then(data => {
                if (!data.ok) {
                    setAlertMessage("아이디 또는 비밀번호 불일치");
                    setAlertIsOpen(true);
                }
                else {
                    localStorage.setItem('jwtToken', data.token);
                    connect(data.token);
                    navigate("/home");

                }
            })
            .catch((err) => {

                console.log(err.message);
            })

    }

    return (
        <div className="login-body">
            <div className="wrapper">
                {/* <div className="logo">
                <Image src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
            </div> */}
                <div className="text-center mt-4 name">
                    Login
                </div>
                <form onSubmit={login} className="p-3 mt-3">
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <Form.Control
                            value={id}
                            onChange={(event) => setId(event.target.value)}
                            placeholder="ID" />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <Form.Control type="password"
                            value={pw}
                            onChange={(event) => setPw(event.target.value)}

                            id="pwd" placeholder="Password" />
                    </div>
                    <Button type="submit" variant="outline-dark">Login</Button>

                </form>
                <div className="text-center fs-6">
                    <a href="#">id/pw 찾기</a> or <a href="#" onClick={() => navigate("/join")}>회원가입</a>
                </div>
                <AlertModal
                    isOpen={alertIsOpen}
                    message={alertMessage}
                    onClose={() => setAlertIsOpen(false)} />


            </div>
        </div>
    )
}


export default LoginPage;
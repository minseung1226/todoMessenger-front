import { useEffect, useState } from "react";
import { getSocket } from "../../socket/socket";
import { Container, Image, Row, Col, Form, Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./ProfileUpdatePage.css"
import PasswordChangeModal from "../../components/PasswordChangeModal/PasswordChangeModal";
import WindowControl from "../../components/WindowControl/WindowControl";
const ProfileUpdatePage = () => {
    const token = localStorage.getItem("jwtToken");
    const socket = getSocket(token);
    const server_url=process.env.REACT_APP_SERVER_URL;
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [profileImg,setProfileImg]=useState("");
    const [profileImgPreview,setProfileImgPreview]=useState("");
    const [deleteImg,setDeleteImg]=useState("");

    useEffect(()=>{
        const handleEsc=(event)=>{
            if(event.key==="Escape"){
                window.electron.closeWindow();
            }    
        }
        window.addEventListener("keydown",handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
          };
    },[])

    const profileImgChange = (event) => {
        const file=event.target.files[0]
        setProfileImg(file);
        if(file){
            const reader=new FileReader();
            reader.onload=(e)=>{
                setProfileImgPreview(e.target.result);
            }

            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        socket.emit("findUser", token, (res) => {
            setUser(res.user);
            setName(res.user.name);
            console.log("profileImg=",profileImg);
            if(res.user.profileImg){
                setProfileImgPreview(process.env.REACT_APP_PROFILE_IMG_URL+res.user.profileImg);
            }
        });


    }, [socket, token]);

    const deleteProfileImg=()=>{
        setDeleteImg(user.profileImg);
        setProfileImgPreview("");
        setProfileImg("");
    }

    const updateSubmit=()=>{
        const formData=new FormData();
        
        formData.append("deleteImg",deleteImg);
        if(profileImg){
            formData.append("file",profileImg);
        }
        formData.append("name",name);


        fetch(`${server_url}/user/update`,{
            method:"PATCH",
            headers:{
                "Authorization":`Bearer ${token}`
            },
            body:formData
        }).then(res=>res.json())
        .then(data=>{
            if(data.ok){
                socket.emit("refreshUser",token);
                window.electron.closeWindow();
            }
        }).catch(err=>{
            console.log("err=",err);
        })
        
    }

    return (
        <Container fluid className="profile-update-container">
            <div className="d-flex justify-content-end">
                <span className="close-btn"
                onClick={()=>window.electron.closeWindow()}>x</span>
            </div>
            <h4 className="title">프로필 변경</h4>
            <Row className="mt-4 mb-3">
                <Col className="d-flex justify-content-center">
                    <div className="profile-img-div">
                        <Image roundedCircle src={profileImgPreview||"/profile.jpeg"} className="my-profile-img"/>
                        <Dropdown  className="img-change-dropdown">
                            <Dropdown.Toggle id="dropdown-basic" className="img-change-toggle" style={{ padding: 0, border: 'none', backgroundColor: 'transparent' }}>
                                <Image src="/camera.png" className="camera-img" /> {/* 여기서 원하는 이미지를 넣으세요 */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-dropdown-menu">
                                <Dropdown.Item as="div" size="sm">
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label 
                                        // htmlFor="hidden-file-input"
                                        className="file-input-label"
                                        >이미지 선택</Form.Label>
                                        <Form.Control type="file"
                                            // id="hidden-file-input"
                                            style={{ display: 'none' }}
                                            onChange={profileImgChange} />
                                    </Form.Group>

                                </Dropdown.Item>
                                <Dropdown.Item onClick={deleteProfileImg}>기본 이미지</Dropdown.Item>
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
                    <div style={{ height: "60px" }}></div>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs={1}></Col>
                <Col className="d-flex justify-content-end">
                    <PasswordChangeModal socket={socket} token={token}/>
                </Col>
                <Col xs={1}></Col>
            </Row>

            <Row className="mb-3">
                <Col xs={1}></Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="outline-dark"
                            onClick={updateSubmit}
                            style={{ marginRight: "8px" }}>확인</Button>
                    <Button variant="outline-dark"
                            onClick={()=>window.electron.closeWindow()}>닫기</Button>
                </Col>
                <Col xs={1}></Col>
            </Row>

        </Container>
    )
}

export default ProfileUpdatePage;
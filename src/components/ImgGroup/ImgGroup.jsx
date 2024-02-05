import { Container, Row, Col, Image } from "react-bootstrap";
import "./ImgGroup.css"
import { useEffect, useState } from "react";

const ImgGroup = ({ members }) => {
    const [users, setUsers] = useState([]);
    const img_url = process.env.REACT_APP_PROFILE_IMG_URL;

    useEffect(() => {
        setUsers(members);
    }, [members])
    return (
        <div className="img-group-container center">
            {users?.length < 2 ?
                <Image roundedCircle src={users[0]?.profileImg ? img_url + users[0].profileImg : "/profile.jpeg"}>
                </Image>
                : <>
                    <Row className="">
                        <Col className="p-0">
                            {(users && users[0]) &&
                                <Image roundedCircle className="min-img"
                                    src={users[0].profileImg ? img_url + users[0].profileImg : "/profile.jpeg"} />

                            }
                        </Col>
                        <Col className="p-0">
                            {(users && users[2]) && <Image roundedCircle className="min-img"
                                src={users[2].profileImg ? img_url + users[2].profileImg : "/profile.jpeg"} />
                            }
                        </Col>
                    </Row>
                    <Row className="img-group-row" >
                        <Col className="p-0 m-0">
                            {(users && users[3]) &&
                                <Image roundedCircle className="min-img"
                                    src={users[3].profileImg ? img_url + users[3].profileImg : "/profile.jpeg"} />}
                        </Col>
                        <Col className="p-0 m-0" >
                            {(users && users[1]) &&
                                <Image roundedCircle className="min-img"
                                    src={users[1].profileImg ? img_url + users[1].profileImg : "/profile.jpeg"} />}
                        </Col>
                    </Row></>
            }
        </div>
    )
}

export default ImgGroup;
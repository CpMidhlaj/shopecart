import { Card,  Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

function Profile(){

    const {user} = useSelector((state) => state.auth);

    return(
        <>
        <Container className="pd">
            <Row className="justify-content-center align-items-center mt-5">
                <Col md={4}>
                <Card>
                    <Card.Body className="position-relative">
                    <span className="edit-icon">
                        <Link as={Link} to={"/edit-profile"}>
                        <FaRegEdit />
                        </Link>
                    </span>
                    <h6>FullName: {user?.fullName}</h6>
                    <h6>Email : {user?.email}</h6>
                    </Card.Body>
                </Card>
             </Col>
            </Row>
        </Container>
        
        </>
    )
}
export default Profile
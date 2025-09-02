import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import useToastAndNavigate from "../hooks/useToastAndNavigate";
import { profileUpdateThunk } from "../redux/authSlice";


function ProfileEdit(){
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const toastAndNavigate = useToastAndNavigate();
    const [signupData,setSignupData] = useState({
        fullName:'',
        email:'',
        });
const [validated, setValidated] = useState(false);
  const handleFormSubmit = async(event) => {
    
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(profileUpdateThunk(signupData))
      .unwrap()
      .then((data)=>  toastAndNavigate(data.success,data.message,'/profile'))
      .catch((error) => toastAndNavigate(false,error?.responce?.data?.message || error.message))
   }
    setValidated(true);
  };

  const handleChange = (event)=>{

    const {name,value} = event.target;
    setSignupData({...signupData , [name]:value})
  };
    return(
        <>
           <Container className="">
                <Row
                  className="justify-content-center"
                  style={{ width: "450px", height: "350px" }}
                >
                  <Col>
                    <div className="login-box">
                      <h2 className="text-center mb-4">Edit Profile</h2>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleFormSubmit}
                      >
                        <Form.Group controlId="fullName" className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            onChange={handleChange}
                            required
                            defaultValue={user?.fullName}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter your full name
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            placeholder="Enter email"
                            defaultValue={user?.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid Email
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                          Update
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Container>
        </>
    )
}
export default ProfileEdit
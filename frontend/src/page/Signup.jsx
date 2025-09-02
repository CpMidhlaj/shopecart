import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./Signup.css";
// import {createUsers} from "../redux/userSlice"
import { useDispatch} from "react-redux";
import useToastAndNavigate from "../hooks/useToastAndNavigate";
import { userRegisterThunk } from "../redux/userSlice";
function Signup() {

   const dispatch = useDispatch();
  const toastAndNavigate = useToastAndNavigate();
  const [signupData,setSignupData] = useState({
    fullName:'',
    email:'',
    password:'',
    age:'',
    gender:'',
    role:'user',
    status:"true"
    });
  const [validated, setValidated] = useState(false);

  const handleFormSubmit = async(event) => {
    
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // const user = {...signupData}
      // user.id = Date.now();
      // dispatch((user))
console.log("signupData--->",signupData);

    //   try {
       
    //    
      
    //   } catch (error) {
    //      console.log(error);
    //     ;
       
        
    //   }      
      dispatch(userRegisterThunk(signupData))
      .unwrap()
      .then((data)=>  toastAndNavigate(data.success,data.message,'/login'))
      .catch((error) => toastAndNavigate(false,error?.responce?.data?.message || error.message))
   }
    setValidated(true);
  };

  const handleChange = (event)=>{

    const {name,value} = event.target;
    setSignupData({...signupData , [name]:value})
  };

  return (
    <>
      <Container className="login-container">
        <Row
          className="justify-content-center"
          style={{ width: "450px", height: "350px" }}
        >
          <Col>
            <div className="login-box">
              <h2 className="text-center mb-4">Sign Up</h2>
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
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Email
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter password
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="age" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    onChange={handleChange}
                    min="1"
                    max="100 "
                    required
                  />
                </Form.Group>
                <Form.Group controlId="genderGroup" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Male"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleChange}
                      required
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Female"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Signup;

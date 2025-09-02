import { Button, Col, Container, Form, Row} from "react-bootstrap"
import "./ListUsers.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUsers } from "../redux/userSlice";
import { useState } from "react";
import { toast } from "react-toastify";
function Edituser(){
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {users} = useSelector((state)=>state.userData)
  const user = users.find( (us)=>us.id === Number(id))
  console.log(user);
  

  const [signupData,setSignupData] = useState({
    fullName:user.fullName,
    email:user.email,
    password:user.password,
    age:user.age,
    gender:user.gender,
    role:'user',
    status:"true",
    id:user.id
    });
  const [validated, setValidated] = useState(false);

  const handleFormSubmit = (event) => {
   
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const updatedUser = {...signupData}
      // user.id = Number(id);
      dispatch(editUsers(updatedUser))
      toast.success('user signup successfully!')
      navigate('/listusers')
    }
    setValidated(true);
    console.log(user);
    
  };

  const handleChange = (event)=>{

    const {name,value} = event.target;
    setSignupData({...signupData , [name]:value})
  };

    return(
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
                          defaultValue={user.fullName}
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
                          defaultValue={user.email}
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
                          defaultValue={user.password}
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
                          defaultValue={user.age}
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
                            defaultChecked={user.gender === 'male'}
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
                            defaultChecked={user.gender === 'female'}
                          />
                        </div>
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
export default Edituser
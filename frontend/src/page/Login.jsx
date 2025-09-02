import { Container,Row , Col, Form ,Button } from "react-bootstrap"
import "./Login.css"
// import { Link } from "react-router-dom"
import { useState } from "react"
import {  userLoginThunk } from "../redux/authSlice"
import { useDispatch } from "react-redux"
import useToastAndNavigate from "../hooks/useToastAndNavigate"

function Login(){

    
    const dispatch = useDispatch();
    const toastAndNavigate = useToastAndNavigate();
    const [userEmail,setUserEmial] = useState(''); 
    const [userPassword,setUserPassword] = useState('');
    const [validated,setValidated] = useState(false);

   
    
    const handleLoginFormSubmit = async (event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.stopPropagation()
        }else{
            // const users = JSON.parse(localStorage.getItem('users'))||[];
            const userData = {
                email:userEmail,
                password:userPassword
            }
        // const user = users.find((u)=>u.email === userEmail);
        // if(!user){

        //     return toast.error("Invalid credentials");
        // }
        // if(user.password !== userPassword){

        //   return toast.error("Invalid credentials");

        // }
                  
        // try {
        // //       const {data} = await axios.get('http://localhost:4000/api/v1/user/login',{
        // //         emial:userEmail,
        // //         password:userPassword
        // //       })
        // // dispatch(userAuth(user)) 
        // // toast.success(data?.message);
        // // navigate("/")

        // } catch (error) {
        //     toast.error(error?.response?.data?.message);
        // }
      dispatch(userLoginThunk(userData))
      .unwrap()
      .then((data) => toastAndNavigate(data.success,data.message,'/'))
      .catch((error) => toastAndNavigate(false, error.message))
        }
        setValidated(true)
        
    }

    return(
        <Container className="login-container">
            <Row className="justify-content-center" style={{width:"450px" , height:"350px"}}>
                <Col>
                    <div className="login-box"> 
                        <h2 className="text-center mb-4">Login</h2>
                        <Form noValidate validated={validated} onSubmit={handleLoginFormSubmit}>
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" required onChange={(event)=>setUserEmial(event.target.value)} placeholder="Enter email" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid Email
                                    </Form.Control.Feedback>   
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" required onChange={(event)=>setUserPassword(event.target.value )} placeholder="Password" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter password
                                    </Form.Control.Feedback>   
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Login
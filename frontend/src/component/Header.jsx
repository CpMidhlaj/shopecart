import { Container, Nav, Navbar,Image } from "react-bootstrap";
import "./Header.css";
import { Link } from "react-router-dom";
import { userLogoutThunk, } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useToastAndNavigate from "../hooks/useToastAndNavigate";

function Header(){
  const {isAuthenticated} = useSelector((state)=> state.auth);
  const {cartItems} = useSelector((state)=> state.productData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toastAndNavigate = useToastAndNavigate();

  const handleLogout = ()=>{
    // toast.success("Logout successfully")
    dispatch(userLogoutThunk())
    .unwrap()
    .then((data)=>  toastAndNavigate(data.success,data.message,'/login'))
    .catch((error) => toastAndNavigate(false,error?.response?.data?.message || error.message))
  }
    return(
        <Navbar expand="lg" className="header-bg " fixed="top">
      <Container>
        <Navbar.Brand  as={Link} to="/" ><Image src="./image/logo.png" className="logo me-5"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/product">Product</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/addproduct">Add Product</Nav.Link>
            <Nav.Link as={Link} to="/listproduct">List Product</Nav.Link>
            <Nav.Link as={Link} to="/listusers">List Users</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart" className="mt-2"><i className="fa-solid fa-cart-shopping"></i><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartItems.length}<span className="visually-hidden">unread messages</span></span> </Nav.Link>
            <Nav.Link as={Link} to="/login">
            {isAuthenticated ? <button onClick={handleLogout} className="btl">Logout</button> : <button className="btl"><i className="fa-regular fa-user"></i>Login</button>}
            </Nav.Link>
            {user && user.role === "admin" && (
                <Nav.Link as={Link} to="/admin/admindashboard" className="mt-2">
                   DASHBOARD
                 </Nav.Link>
                    )}
            
                 {user && user.role !== "admin" && (
                  <Nav.Link as={Link} to="/profile">
                      <span>
                     <i className="bi bi-person-circle fs-2"></i>
                         </span>
                          </Nav.Link>
                            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default Header



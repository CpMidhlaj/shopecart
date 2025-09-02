import { Container ,Row,Col,} from "react-bootstrap"
import"./Footer.css"
function Footer(){
    return(
        <>
      
<Container fluid  className="footer-bg mt-5">   
<Container >
<Row className="pt-5">
    <Col sm={6} md={3}>
        <ul type="none">
            <li><h6>ABOUT</h6></li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
        </ul>
    </Col>
    <Col sm={6} md={3}>
        <ul type="none">
            <li><h6>GROUP COMPANIES</h6></li>
            <li>Myntra</li>
            <li>Cleartrip</li>
            <li>shopsy</li>
        </ul>
    </Col>
    <Col sm={6} md={3}>
        <ul type="none">
            <li><h6>HELP</h6></li>
            <li>payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
        </ul>
    </Col>
    <Col sm={6} md={3}>
        <ul type="none">
            <li><h6>CONSUMER POLISY</h6></li>
            <li>Cancellation & Returns</li>
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
        </ul>
    </Col>
</Row>

<Row className="">
<Col className="d-flex justify-content-center">
    <p><i className="fa-brands fa-instagram m-2"></i></p>
    <p><i className="fa-brands fa-facebook-f m-2"></i></p>
    <p><i className="fa-brands fa-x-twitter m-2"></i></p>
    </Col>
</Row>

<Row className="text-center">
    <p> © 2007-2024 Flipcart.com</p>
</Row>
</Container>  
</Container>
</>
    )
}
export default Footer
import { Col, Container , Row ,Card,Button} from "react-bootstrap"
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/productSlice";
import {Link} from "react-router-dom"


function Product({products}){
   const dispatch = useDispatch();
    console.log(products);
 
    // const handleCartCount = ()=>{
    //   setCartCount(cartCount + 1)
    //   console.log(cartCount);
      
    // }
    const handleAddToCart =(product)=>{
      dispatch(addToCart(product))
    }
    return (
      <>
        <Container className="tp">
          <Row className="mt-5">
            {products && products.map(product=>
            (
            <Col md={4} key={product._id}>
            <Card>
              <div className="fix">
                <Link to={`/productdetails/${product._id}`}>
                <Card.Img variant="top" src={product.productPhoto} />
                </Link>
              </div>
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>
                {product.productDiscription}
                </Card.Text>
                <h2>{product.productPrice}</h2>
                <Button variant="primary"  onClick={()=>{handleAddToCart(product)}} >ADD TO CART</Button>
              </Card.Body>
            </Card>
            </Col>
            ))}
          </Row>
        </Container>
      </>
    );
}
export default Product
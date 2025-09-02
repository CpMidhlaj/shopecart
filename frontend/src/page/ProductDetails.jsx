import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap"
import "./ProductDetails.css"
import { addToCart } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom"
function ProductDetails(){


    const dispatch = useDispatch();

    const {id} = useParams()
    const {products} = useSelector((state)=>state.productData)
    const product = products?.find((pr)=>pr.id === Number(id));

      const handleAddToCart =(product)=>{
          dispatch(addToCart(product));
        }
    return (
      <>
        <Container>
          <Row className="pd">
            <Col md={4} >
              <Image src={product?.productPhoto} alt={product?.productName} />
            </Col>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>{product.productName}</ListGroup.Item>
                <ListGroup.Item>{product.productDiscription}</ListGroup.Item>
                <ListGroup.Item>{product.productPrice}</ListGroup.Item>
                <Button variant="primary"  onClick={()=>{handleAddToCart(product)}} >ADD TO CART</Button>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </>
    );
}
export default ProductDetails
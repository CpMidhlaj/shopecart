import { Button, Col, Container, Form, Image, InputGroup, Row, Table } from "react-bootstrap";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, handleCartDecrement, handleCartIncrement } from "../redux/productSlice";

function Cart() {
  const dispatch = useDispatch();
  const {cartItems,productCost} = useSelector((state)=>state.productData)
  console.log(cartItems);
  const handleIncrement =(item)=>{
    dispatch(handleCartIncrement(item))
  }
  const handleDecrement =(item)=>{
    dispatch(handleCartDecrement(item))
  };
  const handleDelete = (item) => {
    dispatch(deleteCartItem(item));
  };
  return (
    <Container className="mt-5">
      {cartItems.length > 0 ?(
        <Row className="top">
          <Col>
            <h2>My Cart</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Photo</th>
                  <th>Product Price</th>
                  <th className="qnt">Quantity</th>
                </tr>
              </thead>
              <tbody>
              {cartItems.map((item,i)=>(
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.productName}</td>
                <td>
                  <Image src={item.productPhoto} alt={item.productName} className="tb"/>
                </td>
                <td>{item.productPrice}</td>
                <td> <InputGroup className="mb-3">
                      <Button variant="outline-secondary" onClick={()=>handleDecrement(item.id)} disabled={item.quantity < 2 ? true : false}>-</Button>
                      <Form.Control  value={item.quantity} readOnly/>
                      <Button variant="outline-secondary" onClick={()=>handleIncrement(item.id)} >+</Button>
                    </InputGroup>
                  </td>
                  <td>
                      <Button variant="danger" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </td>
              </tr>))}
                <tr>
                  <td colSpan={6} className="bg-secondary text-white text-end" >
                      <h2>Total:₹{productCost}</h2></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

      ) :(
          <Row className="top">
            <h2>cart is empty</h2>
          </Row>
      )    }
  </Container>
  );
}
export default Cart;

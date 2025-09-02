import { Button, Col, Container, Image, Modal, Row, Table } from "react-bootstrap";
import "./Listproduct.css";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {  deleteProductThunk, listAllProductThunk } from "../redux/productSlice";
import useToastAndNavigate from "../hooks/useToastAndNavigate";
import { useEffect, useState } from "react";


function ListProduct() {

  const dispatch = useDispatch()
  const toastAndNavigate = useToastAndNavigate();
  const [show, setShow] = useState(false);
    const [deleteProductID,setDeleteProductID] = useState(null);
  
   
    // const handleShow = () => setShow(true);
  

    // const products = JSON.parse( localStorage.getItem("products")) ||[]
     const {products} = useSelector((state)=> state.productData);

   useEffect(() => {
       dispatch(listAllProductThunk());
     }, [dispatch])
    const handleProductDelete = ()=>{
      // const productIndex = products.findIndex((pr)=> pr.id === Number(id))
      
      // if(productIndex !== -1){
      //   products.splice(productIndex,1)
      //   console.log(products);
        
      //   localStorage.setItem('products',JSON.stringify(products))
      // }
      dispatch(deleteProductThunk(deleteProductID))
        .unwrap()
      .then((data)=>  toastAndNavigate(data.success,data.message,'/listproduct'))
      .catch((error) => toastAndNavigate(false,error?.responce?.data?.message || error.message))
      setShow(false);
    }
    
     const handleClose = () => setShow(false);

     const handleProductDeleteModal = (productID)=>{
      setDeleteProductID(productID);
      setShow(true);
     }

  return (
    <>
      <Container>
        <Row>
          <Col className="tp">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Product Name</th>
                  <th>Product Discription</th>
                  <th>Product Price</th>
                  <th>Product Photo</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products && products.map((product, indext) =>(
                <tr key={indext}>
                  <td>{indext +1 }</td>
                  <td>{product.productName}</td>
                  <td>{product.productDiscription}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    <Image src={product.productPhoto} alt="" width={50}/>
                  </td>
                  <td>
                    <Link to={`/admin/Editproduct/${product._id}`}><FaEdit/></Link></td>
                  <td><Link onClick={()=> handleProductDeleteModal(product._id)}>
                  <MdDelete />
                  </Link></td>
                </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
       <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this Product?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleProductDelete}>
                  Yes,Delete
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  );
}
export default ListProduct;

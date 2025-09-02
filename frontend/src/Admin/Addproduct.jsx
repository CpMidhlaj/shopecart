import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import * as formik from 'formik';
import * as yup from 'yup';
import "./AddProduct.css"
import { addProductThunk} from "../redux/productSlice"
import {useDispatch} from "react-redux"
import useToastAndNavigate from "../hooks/useToastAndNavigate";
import { useState } from "react";


function AddProduct(){
    
  const dispatch = useDispatch();
  const [productPhotos,setProductPhotos] = useState([]);
  const toastAndNavigate = useToastAndNavigate();
    

    const { Formik } = formik;
    const products = JSON.parse( localStorage.getItem("products")) ||[];
    

    const schema = yup.object().shape({
      productName: yup.string().required("Please Enter Product Name"),
      productPrice: yup.string().required("Please Enter Product Price"),
      productDiscription: yup.string().required("Please Enter Product Dscription"),
      productPhotos: yup.string().required(),
    });
 
    const handleProductPhotosAdd = ()=>{
      setProductPhotos((prev)=>{
        const newPhotos = [...prev,[]];

        return newPhotos;
      })
    }
    console.log("productphotos----->",productPhotos);
    

    const handleAddProduct = async(product)=>{

      // product.id = Date.now()
      // dispatch(addProducts(product))
      // console.log(products);
      dispatch(addProductThunk(product))
    .unwrap()
    .then((data) => toastAndNavigate(data.success,data.message, '/listproduct'))
    .catch((err)=> toastAndNavigate(false, err.message))

       
    }
 
  
    return (
      <Container className="fx">
        <Row className="mt-5 justify-content-center">
          <Col md={4}>
            <Formik
              validationSchema={schema}
              onSubmit={handleAddProduct}
              initialValues={{
                productName: "",
                productPrice: "",
                productDiscription: "",
                productPhotos: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label>Product name</Form.Label>
                      <Form.Control
                        type="text"
                        name="productName"
                        value={values.productName}
                        onChange={handleChange}
                        isValid={touched.productName && !errors.productName}
                        isInvalid={!!errors.productName}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.productName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label>Product price</Form.Label>
                      <Form.Control
                        type="text"
                        name="productPrice"
                        value={values.productPrice}
                        onChange={handleChange}
                        isValid={touched.productPrice && !errors.productPrice}
                        isInvalid={!!errors.productPrice}
                      />

                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback>
                        {errors.productPrice}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="validationFormikUsername">
                      <Form.Label>Product discription</Form.Label>
                      <Form.Control
                        type="text"
                        name="productDiscription"
                        value={values.productDiscription}
                        onChange={handleChange}
                        isInvalid={!!errors.productDiscription}
                        isValid={
                          touched.productDiscription &&
                          !errors.productDiscription
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.productDiscription}
                      </Form.Control.Feedback>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  {productPhotos &&
                    productPhotos.map((file, i) => (
                      <Row className="mb-3" key={i}>
                        <Form.Group as={Col} controlId="validationFormik03">
                          <Form.Label></Form.Label>
                          <InputGroup>
                            <Form.Control
                              placeholder={`upload product photo ${i + 1}`}
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary">
                              cancel
                            </Button>
                          </InputGroup>
                        </Form.Group>
                      </Row>
                    ))}
                  <div className="mb-4 mt-3">
                    <Button
                      type="button"
                      className="w-50"
                      onClick={handleProductPhotosAdd}
                    >
                      add product photo
                    </Button>
                  </div>
                  <div>
                    <Button type="submit" className="w-100">
                      Submit form
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
}
export default AddProduct
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import * as formik from 'formik';
import * as yup from 'yup';
import "./AddProduct.css"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProductThunk } from "../redux/productSlice";
import useToastAndNavigate from "../hooks/useToastAndNavigate";

 
function EditProduct(){
    
     const dispatch = useDispatch();
      const toastAndNavigate = useToastAndNavigate();

    const { Formik } = formik;
    // const products = JSON.parse( localStorage.getItem("products")) ||[]
    
    const {id} = useParams();
     const {products} = useSelector((state)=> state.productData);
    const product = products.find((pr)=> pr._id === id)
    console.log(product);
    
  
    
    const schema = yup.object().shape({
      productName: yup.string().required("Please Enter Product Name"),
      productPrice: yup.string().required("Please Enter Product Price"),
      productDiscription: yup.string().required("Please Enter Product Dscription"),
      productPhoto: yup.string().required(),
    });

    const handleEditProduct = (updateProduct)=>{
    
     
      // const productIndex = products.findIndex((pr)=> pr._id === id)
      // if(products !== -1){
      //   products[productIndex] = product
      //   localStorage.setItem("products",JSON.stringify(products))
      // }
     
      // 
      updateProduct._id = id;
      
      dispatch(editProductThunk(updateProduct))
       .unwrap()
      .then((data)=>  toastAndNavigate(data.success,data.message,'/listproduct'))
      .catch((error) => toastAndNavigate(false,error?.responce?.data?.message || error.message))
    }
   
    return (
        <Container  className="fx">
            <Row className="mt-5 justify-content-center">
                <Col md={4}>
                <Formik
        validationSchema={schema}
        onSubmit={handleEditProduct}
        initialValues={{
          productName: product.productName,
          productPrice: product.productPrice,
          productDiscription: product.productDiscription,
          productPhoto: product.productPhoto,

        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}  controlId="validationFormik01">
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
              <Form.Group as={Col}  controlId="validationFormik02">
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
              <Form.Group as={Col}  controlId="validationFormikUsername">
                <Form.Label>Product discription</Form.Label>
                  <Form.Control
                    type="text"
                    name="productDiscription"
                    value={values.productDiscription}
                    onChange={handleChange}
                    isInvalid={!!errors.productDiscription}
                    isValid={touched.productDiscription && !errors.productDiscription}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productDiscription}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}  controlId="validationFormik03">
                <Form.Label>Product photo</Form.Label>
                <Form.Control
                  type="text"
                  name="productPhoto"
                  value={values.productPhoto}
                  onChange={handleChange}
                  isInvalid={!!errors.productPhoto}
                  isValid={touched.productPhoto && !errors.productPhoto}
                />
  
                <Form.Control.Feedback type="invalid">
                  {errors.productPhoto}
                </Form.Control.Feedback>
              </Form.Group>
 
            </Row>
            <div > 
            <Button type="submit" className="w-100">Update form</Button>
            </div>
          </Form>
        )}
      </Formik>
                </Col>
            </Row>
        </Container>

    );
}
export default EditProduct
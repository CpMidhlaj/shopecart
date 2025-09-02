import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from './component/Header';
import Home from './page/Home';
import Product from './page/Products';
import Contact from './page/Contact';
import Cart from './page/Cart';
import Login from './page/Login';
import Footer from './component/Footer';
import AddProduct from './Admin/Addproduct';
import ListProduct from './Admin/Listproduct';
import EditProduct from './Admin/EditProduct';
import Signup from './page/Signup';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './utils/ProtectedRoute';
import ListUsers from './Admin/ListUsers';
import Edituser from './Admin/Editusers';
import axios from 'axios';
import { useEffect } from 'react';
import ProductDetails from './page/ProductDetails';
import Profile from './page/profile';
import ProfileEdit from './page/ProfileEdit';


const App=()=>{
  //  const [cartCount,setCartCount] = useState(0);
  useEffect(()=>{
    const fetchproducts = async()=>{
      try{
          const {data} = await axios("https://fakestoreapi.com/products")
          console.log("response--->",data);
          
      }catch(error){
         console.log(error.massege);
         
      }
     }
     fetchproducts()
  })
  
  const Products = JSON.parse(localStorage.getItem("products"))
  return (
  <Router>
    <Header/>
    <ToastContainer autoClose={1500} position={'top-right'}/>
    <Routes>
      <Route path="/" element={<Home products={Products} />}/>
      <Route path="/product" element={<Product products={Products} />}/>
      <Route path="/productdetails/:id" element={<ProductDetails/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/addproduct" element={<ProtectedRoute>
        <AddProduct/>
      </ProtectedRoute>}/>
      <Route path="/listproduct" element={<ProtectedRoute requiredRole={["admin"]}>
        <ListProduct/>
      </ProtectedRoute>}/>
      <Route path="/listusers" element={<ProtectedRoute requiredRole={["admin"]}>
        <ListUsers/>
      </ProtectedRoute>}/>
      <Route path="/admin/Editproduct/:id" element={<EditProduct/>}/>
      <Route path="/admin/edituser/:id" element={<Edituser/>}/>
      <Route path="/cart" element={<ProtectedRoute>
        <Cart/>
        </ProtectedRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/edit-profile" element={<ProfileEdit/>}/>
    </Routes>
    <Footer/>
  </Router>

 
  )
}
  
export default App

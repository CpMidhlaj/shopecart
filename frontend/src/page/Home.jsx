import Homecarosal from "../component/Homecarosal"
import Product from "./Products"

function Home({products,fetchproducts}){
      console.log(products);
      
    return(
       <>
       <Homecarosal/>
       <Product products={products}  fetchproducts={fetchproducts}/>
       </>
    )
}
export default Home
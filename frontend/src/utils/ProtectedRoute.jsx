import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({requiredRole,children}){

    const {isAuthenticated,user} = useSelector((state)=>state.auth);
    console.log("requiredRole-->",requiredRole);
    

    if(!isAuthenticated){
        return(
            <Navigate to={'/login'}/>
        )
    }
    if(requiredRole && !requiredRole.includes(user.role)){
        return <Navigate to={'/login'}/>
    }
    return(
        children
    )
}
export default ProtectedRoute
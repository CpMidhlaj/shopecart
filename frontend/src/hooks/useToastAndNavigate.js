import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const useToastAndNavigate = ()=>{

    const navigate = useNavigate();

    const toastAndNavigate = (success , message, path=null)=>{
        
        if(!success){
            return toast.error(message);
        }

        toast.success(message);

        if(path){
            navigate(path)
        }
    }
    return toastAndNavigate;
} 
export default useToastAndNavigate;
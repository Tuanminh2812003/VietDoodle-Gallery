import { useNavigate } from "react-router-dom"
import { deleteAllCookies } from "../../components/Cookies/Cookies";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/DangNhap";

function DangXuat(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    deleteAllCookies();

    useEffect(()=>{
        dispatch(checkLogin(false));
        navigate("/dangnhap")
    }, []);
    return(
        <>
        
        </>
    )
}

export default DangXuat;
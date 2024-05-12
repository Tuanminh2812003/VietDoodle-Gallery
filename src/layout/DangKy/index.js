import { useState, useEffect } from "react";
import { setCookie } from "../../components/Cookies/Cookies"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/DangNhap";
import { Link, NavLink, Outlet } from "react-router-dom";

function DangNhap(){
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        
        if(email && password && name){
            const response = await fetch('https://google-doodle-v2-v2.vercel.app/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: `${name}`,
                    email: `${email}`,
                    password: `${password}`,
                }),
            })
            .then(response => response.json())
            .then(data => setMessage(data))
            .catch(error => console.error('Error:', error));
        }
    }
    if(message.code === 200){
        console.log(message);
        navigate("/dangnhap");
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Đăng ký</h2>
                <div>
                    <input type="text"/>
                </div>
                <div>
                    <input type="email"/>
                </div>
                <div>
                    <input type="password"/>
                </div>
                <button>Đăng ký</button>
            </form>
        </>
    )
}

export default DangNhap;
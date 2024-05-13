import { useState, useEffect } from "react";
import { setCookie } from "../../components/Cookies/Cookies"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/DangNhap";
import { Link, NavLink, Outlet } from "react-router-dom";

function DangKy(){
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
            <div className="dangNhap">
                <div className="dangNhap__title">Đăng nhập vào VietDoodle Gallery</div>
                <div className="dangNhap__dangKy">
                    <div className="dangNhap__dangKy__text">Bạn đã có tài khoản?</div>
                    <Link to="/dangnhap" className="dangNhap__dangKy__button">
                        Đăng nhập ngay
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tên của bạn"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button style={{marginTop: `30px`}}>Đăng ký</button>
                </form>
            </div>
        </>
    )
}

export default DangKy;
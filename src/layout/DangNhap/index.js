import { useState, useEffect } from "react";
import { setCookie } from "../../components/Cookies/Cookies"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/DangNhap";
import { Link, NavLink, Outlet } from "react-router-dom";
import './DangNhap.scss';

function DangNhap(){
    const [message, setMessage] = useState([]);
    const [emailUser, setEmailUser] = useState([]);
    const navigate = useNavigate();

    const dispath = useDispatch();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        setEmailUser(email);
        const password = e.target[1].value;
        
        if(email && password){
            const response = await fetch('https://google-doodle-v2-v2.vercel.app/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
        setCookie("email", emailUser, 30);
        setCookie("token", message.token, 30);
        dispath(checkLogin(true));
        navigate("/")
    }

    return(
        <>
            <div className="dangNhap">
                <div className="dangNhap__title">Đăng nhập vào VietDoodle Gallery</div>
                <div className="dangNhap__dangKy">
                    <div className="dangNhap__dangKy__text">Bạn chưa có tài khoản?</div>
                    <Link to="/dangky" className="dangNhap__dangKy__button">
                        Đăng ký ngay!
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <Link to="/dangky" className="forgot">
                        Quên mật khẩu
                    </Link>
                    <button>Đăng nhập</button>
                </form>
            </div>
        </>
    )
}

export default DangNhap;
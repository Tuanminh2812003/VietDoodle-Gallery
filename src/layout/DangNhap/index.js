import React, { useState, useEffect, useRef } from 'react';
import { setCookie } from "../../components/Cookies/Cookies"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/DangNhap";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import './DangNhap.scss';

function DangNhap(){

    const [showModalSaiTk, setShowModalSaiTk] = useState(false); // State để kiểm soát hiển thị modal
    const modalRef = useRef(null); // Ref cho modal

    const [message, setMessage] = useState([]);
    const [emailUser, setEmailUser] = useState([]);
    const [textAleart, setTextAleart] = useState(""); // Thêm state để chứa thông báo lỗi
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const modalContentRef = useRef(null);

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

    console.log(message);

    useEffect(() => {
        if(message.code === 200){
            setCookie("email", emailUser, 30);
            setCookie("token", message.user.token, 30);
            dispatch(checkLogin(true));
            navigate("/")
        } else if(message.code === 400){
            setTextAleart("Sai mật khẩu!"); // Cập nhật state textAleart
            setShowModalSaiTk(true); // Hiển thị modal khi có lỗi
        } else if(message.code === 404){
            setTextAleart("Sai tài khoản!"); // Cập nhật state textAleart
            setShowModalSaiTk(true); // Hiển thị modal khi có lỗi
        }
    }, [message]); // Chạy lại effect khi message thay đổi

    const handleClickOutside = (event) => {
        // Kiểm tra xem click có xảy ra bên ngoài modal không
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModalSaiTk(false); // Nếu click bên ngoài modal, đóng modal
        }
    };

    const handleEditClick = () => {
        setShowModalSaiTk(true); // Khi nhấn vào nút "Sửa", hiển thị modal
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

            {showModalSaiTk && textAleart && (
                <div className='dangNhap__backModal' onClick={() => setShowModalSaiTk(false)}></div>
            )}
            {showModalSaiTk && textAleart && (
                <div className="dangNhap__modal" ref={modalRef}>
                    <div className='dangNhap__modal--buttonClose' onClick={() => setShowModalSaiTk(false)}><IoMdCloseCircleOutline /></div>
                    <div className="dangNhap__modal--content" ref={modalContentRef}>
                        {textAleart}
                    </div>
                    <div className='dangNhap__modal__dangKy'>
                        <div className="dangNhap__dangKy__text">Bạn chưa có tài khoản?</div>
                        <Link to="/dangky" className="dangNhap__dangKy__button">
                            Đăng ký ngay!
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default DangNhap;

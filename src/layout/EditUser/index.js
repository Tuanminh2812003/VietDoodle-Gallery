import './EditUser.scss'
import { getCookie } from "../../components/Cookies/Cookies";
import { useState, useEffect, useRef } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/DangNhap";
import { useNavigate } from "react-router-dom"
import { deleteAllCookies } from "../../components/Cookies/Cookies";

function EditUser(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailUser = getCookie("email");
    const [dataUser, setDataUser] = useState([]);
    const [showModalName, setShowModalName] = useState(false); // State để kiểm soát hiển thị modal
    const [showModalPass, setShowModalPass] = useState(false); // State để kiểm soát hiển thị modal
    const modalRef = useRef(null); // Ref cho modal

    useEffect(() => {
        fetchDataUser();
        // Thêm event listener khi mount component
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup: loại bỏ event listener khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchDataUser = async () => {
        try {
            const userDataResponse = await fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/user/`);
            const userData = await userDataResponse.json();
            const findUser = userData.find(item => item.email === emailUser);
            setDataUser(findUser);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleEditNameClick = () => {
        setShowModalName(true); // Khi nhấn vào nút "Sửa", hiển thị modal
    }

    const handleEditPassClick = () => {
        setShowModalPass(true); // Khi nhấn vào nút "Sửa", hiển thị modal
    }

    const handleClickOutside = (event) => {
        // Kiểm tra xem click có xảy ra bên ngoài modal không
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModalName(false); // Nếu click bên ngoài modal, đóng modal
            setShowModalPass(false);
        }
    };

    const [message, setMessage] = useState([]);
    const handleSubmitName = async (e) =>{
        e.preventDefault();
        const userPassword = e.target[0].value;
        const newName = e.target[1].value;
        // if(userPassword && newName){
        //     const response = await fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/user/change-password/663fc153a94fe0c5a70357f7`, {
        //             method: 'PATCH',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 old_password: "tuanminh2812003"
        //             }),
        //         })
        //         .then(response => response.json())
        //         .then(data => setMessage(data))
        //         .catch(error => console.error('Error:', error));
        // }
    }

    const handleSubmitPass = async (e) =>{
        e.preventDefault();
        const old_password = e.target[0].value;
        const new_password = e.target[1].value;
        const new_password2 = e.target[2].value;
        if(old_password && new_password && new_password2){
            if(new_password === new_password2){
                const response = await fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/user/change-password/${dataUser._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        old_password: `${old_password}`,
                        new_password: `${new_password}`
                    }),
                })
                .then(response => response.json())
                .then(data => setMessage(data))
                .catch(error => console.error('Error:', error));
            }
        }
    }

    console.log(message);
    if(message.code === 200){
        deleteAllCookies();
        dispatch(checkLogin(false));
        navigate("/dangnhap")
    }
    return (
        <>
            <div className='editUser'>
                <div className='editUser__title'>Thông tin tài khoản</div>
                <div className='editUser__fullNameAndId'>
                    <div className='editUser__fullNameAndId__fullName'>Tên người dùng: {dataUser.fullName}</div>
                    <div className='editUser__fullNameAndId__id'>ID: {dataUser._id}</div>
                </div>
                <div className='editUser__fix'>
                    <div className='editUser__fix__innerFix'>
                        <div className='editUser__fix__innerFix__title'>Email (không thể chỉnh sửa):</div>
                        <div className='editUser__fix__innerFix__input'><p>{dataUser.email}</p></div>
                    </div>
                    <div className='editUser__fix__button--hidden'>Sửa</div>
                </div>
                <div className='editUser__fix'>
                    <div className='editUser__fix__innerFix'>
                        <div className='editUser__fix__innerFix__title'>Tên người dùng:</div>
                        <div className='editUser__fix__innerFix__input'><p>{dataUser.fullName}</p></div>
                    </div>
                    <div className='editUser__fix__button' onClick={handleEditNameClick}>Sửa</div> {/* Khi nhấn vào nút "Sửa", gọi hàm handleEditClick */}
                </div>
                <div className='editUser__fix'>
                    <div className='editUser__fix__innerFix'>
                        <div className='editUser__fix__innerFix__title'>Mật khẩu:</div>
                        <div className='editUser__fix__innerFix__input'><p>**********</p></div>
                    </div>
                    <div className='editUser__fix__button' onClick={handleEditPassClick}>Sửa</div> {/* Khi nhấn vào nút "Sửa", gọi hàm handleEditClick */}
                </div>
            </div>
            {/* Hiển thị modal khi state showModal là true */}
            {showModalName && (
                <div className='backModal' onClick={() => setShowModalName(false)}></div>
            )}
            {showModalName && (
                <div className="modal" ref={modalRef}>
                    <div className='modal--buttonClose' onClick={() => setShowModalName(false)}><IoMdCloseCircleOutline /></div>
                    <div className="modal--content">
                        <form  onSubmit={handleSubmitName}>
                            <label>Xác minh mật khẩu:</label>
                            <input type="text"/>
                            <label>Tên mới:</label>
                            <input type="text" placeholder={dataUser.fullName} />
                            <button>Lưu</button>
                        </form>
                    </div>
                </div>
            )}

            {showModalPass && (
                <div className='backModal' onClick={() => setShowModalPass(false)}></div>
            )}
            {showModalPass && (
                <div className="modal" ref={modalRef}>
                    <div className='modal--buttonClose' onClick={() => setShowModalPass(false)}><IoMdCloseCircleOutline /></div>
                    <div className="modal--content">
                        <form onSubmit={handleSubmitPass}> 
                            <label>Xác minh mật khẩu:</label>
                            <input type="password" />
                            <label>Mật khẩu mới</label>
                            <input type="password"/>
                            <label>Điền lại mật khẩu mới</label>
                            <input type="password"/>
                            <button>Lưu</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditUser;

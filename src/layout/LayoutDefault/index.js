import "./LayoutDefault.scss";
import Imgchinh from "../../image/vietdoodle.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import Line from "../../components/Line";
import { useState,useEffect, useRef } from "react";
import { MdOutlineSavedSearch } from "react-icons/md";
import { getCookie } from "../../components/Cookies/Cookies";
import { useSelector } from "react-redux";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { BiMailSend } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

function LayoutDefault(){
    const [isScrolled, setIsScrolled] = useState(false);
    const token = getCookie("token");
    const emailUser = getCookie("email");
    var nameUser = null;
    const isLogin = useSelector(state => state.DangNhapReducer);

    const [showModalGift, setShowModalGift] = useState(false); // State to control modal visibility
    const [showModalGift2, setShowModalGift2] = useState(false); // State to control modal visibility
    const modalRef = useRef(null); // Ref for modal
    const modalContentRef = useRef(null);

    const handleClickOutside = (event) => {
        // Check if click occurred outside the modal
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModalGift(false); // Close modal if click is outside
            setShowModalGift2(false);
        }
    };

    const handleGiftClick = () => {
        setShowModalGift(true); // Show modal when edit button is clicked
    }
    const handleGift2Click = () => {
        setShowModalGift(false); // Show modal when edit button is clicked
        setShowModalGift2(true);
    }

    useEffect(() => {
        fetchDataUser();
    }, []);
    const [dataUser, setDataUser] = useState([])
    const fetchDataUser = () => {
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/user/`)
            .then(res => res.json())
            .then(data => {
                setDataUser(data);
            })
            .catch(error => console.error("Error fetching random doodle: ", error));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if(dataUser){
        for(let i=0; i< dataUser.length ; i++){
            if(emailUser === dataUser[i].email){ 
                nameUser = dataUser[i].fullName;
            }
        }
    }
    
    return(
        <>
            <header className={`${isScrolled ? 'header--scrolled' : ''}`}>
                <div className="header">
                    <Link to={"/"}>
                        <img src={Imgchinh} alt="logopage" className="header__image"/>
                    </Link>
                    <Line />
                    <div className="header__menu">
                        <ul className="header__menu__inner">
                            <Link to="/">
                                <li>
                                    Trang chủ
                                </li>
                            </Link>
                            <Link to="/thuvien">
                                <li>
                                    Thư viện
                                </li>
                            </Link>
                            <Link to="/huongdan">
                                <li>
                                    Hướng dẫn
                                </li>
                            </Link>
                            <Link to="/sukien">
                                <li>
                                    Sự kiện
                                </li>
                            </Link>
                        </ul>
                        <div className="header__menu__find">
                            <div className="header__menu__find__icon">
                                <MdOutlineSavedSearch className="header__menu__find__icon__innerIcon"/>
                                <input className="header__menu__find__icon__input" placeholder="Tìm Doodle"/>
                            </div>

                            {token && token !== 'undefined' ?(
                                <div className="header__menu__find__user">
                                    <div className="header__menu__find__login">
                                        <div className="header__menu__find__login__text">Cài đặt</div>
                                        <div className="header__menu__find__login__icon">
                                            <FaArrowDownShortWide />
                                        </div>
                                    </div>
                                    <div className="header__menu__find__user--hidden">
                                        <div className="header__menu__find__user--hidden__tamGiac"></div>
                                        <div className="header__menu__find__user--hidden__nameUser">TK: {nameUser}</div>
                                        <Link to="/congcu" className="header__menu__find__user--hidden__setting">Bộ sưu tập</Link>
                                        <Link to="/taikhoan" className="header__menu__find__user--hidden__setting">Quản lý tài khoản</Link>
                                        <NavLink to="/dangxuat">
                                            <div className="header__menu__find__user--hidden__setting">Đăng xuất</div>
                                        </NavLink>
                                    </div>
                                </div>
                            ) : (
                                <NavLink to="/dangnhap">
                                    <div className="header__menu__find__login">Đăng nhập</div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <Line />
                </div>
            </header>

            <main>
                <Outlet/>
            </main>

            <footer>
                <div className="footer">
                    <div className="footer__about">
                        <Link to={"/privacy"}>
                            Privacy Policy
                        </Link>
                    </div>
                    <div className="footer_follow">
                        <div className="footer__follow__us">
                            Theo dõi chúng tôi
                        </div>
                        <div className="footer__follow__icon">
                            <div className="footer__follow__icon__icon--marginLeft">
                                <FaFacebookF />
                            </div>
                            <div className="footer__follow__icon__icon">
                                <FaGithub />
                            </div>
                            <div className="footer__follow__icon__icon">
                                <IoIosMail />
                            </div>
                        </div>
                    </div>
                    <div className="footer__input">
                        <div className="footer__input__text">
                            Nhận thông tin mới nhất về chúng tôi
                        </div>
                        <div className="footer__input__email">
                            <div className="footer__input__email__text">
                                Email
                            </div>
                            <div className="footer__input__email__icon">
                                <BiMailSend />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="gift" onClick={handleGiftClick}>
                <FaGift />
            </div>

            {showModalGift && (
                <div className='backModalGift' onClick={() => setShowModalGift(false)}></div>
            )}
            {showModalGift && (
                <div className="modalGift" ref={modalRef}>
                    <div className='modalGift--buttonClose' onClick={() => setShowModalGift(false)}><IoMdCloseCircleOutline /></div>
                    <div className="modalGift--content" ref={modalContentRef}>
                        <div className="modalGift--content__title">
                            Trao gửi yêu thương cùng VietDoodle Gallery
                        </div>
                        <div className="modalGift--content__disc">
                            Hãy để chúng tôi hiểu hơn về bạn
                        </div>
                        <div className="modalGift--content__disc2">
                            Mọi thông tin bạn cung cấp đều được bảo mật (đọc thêm trong phần chính sách bảo mật của chúng tôi)
                        </div>
                        <label>Tên đầy đủ của bạn:</label>
                        <input type="Text"></input>
                        <label>Ngày tháng năm sinh:</label>
                        <input type="date"></input>
                        <label>Địa chỉ:</label>
                        <input type="Text"></input>
                        <div className="modalGift--content__next" onClick={() => setShowModalGift(false)}>
                            Hoàn thành
                        </div>
                        <div className="modalGift--content__gift" onClick={handleGift2Click}>
                            <div className="modalGift--content__gift__text">
                                Trao đi yêu thương
                            </div>
                            <div className="modalGift--content__gift__icon">
                                <FaGift />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModalGift2 && (
                <div className='backModalGift2' onClick={() => setShowModalGift2(false)}></div>
            )}
            {showModalGift2 && (
                <div className="modalGift2" ref={modalRef}>
                    <div className='modalGift2--buttonClose' onClick={() => setShowModalGift2(false)}><IoMdCloseCircleOutline /></div>
                    <div className="modalGift2--content" ref={modalContentRef}>
                        <div className="modalGift2--content__title">
                            Tạo Gift card
                        </div>
                        <div className="modalGift2--content__disc">
                            Viết lời chúng và chia sẻ
                        </div>
                        <div className="modalGift2--content__disc2">
                            Hãy viết những lời chúc thật ý nghĩa và chia sẻ (gift card sẽ được gửi chung với món quà của bạn)
                        </div>
                        <div className="modalGift2--content__gift">
                            <div className="modalGift2--content__gift__inner--opacity">
                            </div>
                            <div className="modalGift2--content__gift__inner">
                                <div className="modalGift2--content__gift__inner__title">
                                    MỪNG XUÂN ẤT TỴ 2025
                                </div>
                                <textarea placeholder="Viết lời chúc của bạn tại đây"></textarea>
                            </div>
                        </div>
                        <div className="modalGift2--content__button">
                            Chọn món quà
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LayoutDefault;
import "./LayoutDefault.scss";
import Imgchinh from "../../image/vietdoodle.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import Line from "../../components/Line";
import { useState,useEffect } from "react";
import { MdOutlineSavedSearch } from "react-icons/md";
import { getCookie } from "../../components/Cookies/Cookies";
import { useSelector } from "react-redux";
import { FaArrowDownShortWide } from "react-icons/fa6";

function LayoutDefault(){
    const [isScrolled, setIsScrolled] = useState(false);
    const token = getCookie("token");
    const emailUser = getCookie("email");
    var nameUser = null;
    const isLogin = useSelector(state => state.DangNhapReducer);

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
                            <Link to={"/"}>
                                <img src={Imgchinh} alt="logopage" className={`header__image--hiden ${isScrolled ? 'header__image--flex' : ''}`}/>
                            </Link>
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
                        <Link to={"/"}>
                            Thông tin thành viên
                        </Link>
                        <Link to={"/privacy"}>
                            Privacy Policy
                        </Link>
                    </div>
                    <div className="footer_follow">
                        <div className="footer__follow__us">
                            Theo doi chung toi
                        </div>
                        <div className="footer__follow__icon">
                            <div className="footer__follow__icon__icon--marginLeft"></div>
                            <div className="footer__follow__icon__icon"></div>
                            <div className="footer__follow__icon__icon"></div>
                        </div>
                    </div>
                    <div className="footer__input">
                        <div className="footer__input__text">
                            Nhan thong tin moi nhat ve chung toi
                        </div>
                        <div className="footer__input__email">
                            <div className="footer__input__email__text">
                                Email
                            </div>
                            <div className="footer__input__email__icon">
                                =
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default LayoutDefault;
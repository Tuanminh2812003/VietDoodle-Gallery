import "./LayoutDefault.scss";
import Imgchinh from "../../image/vietdoodle.png";
import { Link, Outlet } from "react-router-dom";
import Line from "../../components/Line";
import { useState,useEffect } from "react";
import { MdOutlineSavedSearch } from "react-icons/md";

function LayoutDefault(){
    const [isScrolled, setIsScrolled] = useState(false);

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
                            <Link to="/congcu">
                                <li>
                                    Công cụ
                                </li>
                            </Link>
                            <Link to="/huongdan">
                                <li>
                                    Hướng dẫn
                                </li>
                            </Link>
                        </ul>
                        <div className="header__menu__find">
                            <div className="header__menu__find__icon">
                                <MdOutlineSavedSearch className="header__menu__find__icon__innerIcon"/>
                                <input className="header__menu__find__icon__input" placeholder="Tìm Doodle"/>
                            </div>
                            <Link to="/">
                                <div className="header__menu__find__login">Đăng nhập</div>
                            </Link>
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
                        About
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
import { useState, useEffect, useRef } from 'react';
import "./Home.scss";
import Thumbnail from "../../image/thumbnail.png";
import Line from "../../components/Line";
import howPic from "../../image/sectionHow.jpg";
import logo from "../../image/logo vuông.png";
import { Link } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

function Home(){

    const [showModal, setShowModal] = useState(true); // State để kiểm soát hiển thị modal
    const modalRef = useRef(null); // Ref cho modal

    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    console.log(date);

    const [data, setData] = useState(null);

    const modalContentRef = useRef(null);
    useEffect(()=>{
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/detail/661a4816d1818c2981bee5d5`)
            .then(res=>res.json())
            .then(data => {
                setData(data);
            })
    },[])

    const [dataNewese, setDataNewese] = useState([]);
    useEffect(()=>{
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/newest`)
            .then(res=>res.json())
            .then(data => {
                setDataNewese(data.slice(0,9));
            })
    },[])

    const [dataNear, setDataNear] = useState([]);
    useEffect(()=>{
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/upcoming`)
            .then(res=>res.json())
            .then(data => {
                setDataNear(data.slice(0,3));
            })
    },[])

    const [dataPopular, setDataPopular] = useState([]);
    useEffect(()=>{
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/popular`)
            .then(res=>res.json())
            .then(data => {
                setDataPopular(data.slice(0,9));
            })
    },[])

    const handleClickOutside = (event) => {
        // Kiểm tra xem click có xảy ra bên ngoài modal không
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false); // Nếu click bên ngoài modal, đóng modal
        }
    };

    const handleEditClick = () => {
        setShowModal(true); // Khi nhấn vào nút "Sửa", hiển thị modal
    }
    
    return(
        <>
            {data && (
                <Link to={"/" + data.slug} className="sectionPic">
                    <div className="sectionPic__image" style={{backgroundImage: `url(${data.image})`}}></div>
                    <div className="sectionPic__box">
                        <div className="sectionPic__box__title">
                            {data.title}
                        </div>
                        <div className="sectionPic__box__disc">
                            {data.time.dateString}
                        </div>
                    </div>
                </Link>
            )}
            <div className="sectionDisc">
                <div className="sectionDisc__site1">
                    <div className="sectionDisc__site1__title">
                        Những ngày lễ quan trọng của Việt Nam cùng nghệ thuật Google Doodle
                    </div>
                    <div className="sectionDisc__site1__disc">
                        <div className="sectionDisc__site1__disc__innerDisc">
                            Chào mừng bạn đến với Việt Doodle, một trang web giúp bạn ghi nhớ những ngày quan trọng của Việt Nam một cách đầy nghệ thuật và quyến rũ. Bước vào thế giới tự do sáng tạo, chiêm ngưỡng các tác phẩm của hàng nghìn họa sĩ trên khắp đất nước.
                        </div>
                        <div className="sectionDisc__site1__disc__innerDisc">
                            Nghệ thuật là không giới hạn, bạn có thể tạo ra những Google Doodle của riêng bạn và có cơ hội tham gia vào hội họa sĩ của chúng tôi.
                        </div>
                        <div className="sectionDisc__site1__disc__innerDisc">
                            Đắm chìm trong một cuộc hành trình kích thích tư duy thông qua các tác phẩm Google Doodle hấp dẫn, hiện đại những vẫn đậm đả truyền thống dân tộc. Với bộ sưu tập đa dạng trải dài trên nhiều phương tiện và thể loại, chúng tôi mời bạn khám phá những lĩnh vực quyến rũ từ hội họa, nhiếp ảnh, trò chơi điện tử và hơn thế nữa.
                        </div>
                    </div>
                </div>
                <div className="sectionDisc__site2">
                    <img src={Thumbnail} alt="Thumbnail"/>
                </div>
            </div>
            <Line/>
            <div className="sectionNew">
                <div className="sectionNew__title">
                    Sự kiên sắp diễn ra
                </div>
                <div className="sectionNew__box">
                    {dataNear.map(item=>(
                            <Link to={"/" + item.slug} className="sectionNew__box__innerBox" key={item._id}>
                                <div className="sectionNew__box__innerBox__image" style={{backgroundImage: `url(${item.image})`}}></div>
                                <div className="sectionNew__box__innerBox__line"></div>
                                <div className="sectionNew__box__innerBox__date">{item.time.dateString}</div>
                                <div className="sectionNew__box__innerBox__title">{item.title}</div>
                            </Link>
                    ))}
                </div>
            </div>
            <div className="sectionHow">
                <div className="sectionHow__pic">
                    <img src={howPic} alt="Cach dung"/>
                </div>
                <div className="sectionHow__text">
                    <div className="sectionHow__text__title">
                        Bạn chưa biết cách sử dụng?
                    </div>
                    <ul className="sectionHow__text__step">
                        <li>
                            Bước 1: Truy cập
                        </li>
                        <li>
                            Bước 2: Cài đặt extension
                        </li>
                        <li>
                            Bước 3: Chọn chế độ Doodle
                        </li>
                        <li>
                            Bước 4: Tận hưởng
                        </li>
                    </ul>
                    <div className="sectionHow__text__button">
                        <Link className="sectionHow__text__button__detail" to="/huongdan">
                            Hướng dẫn chi tiết
                        </Link>
                    </div>
                </div>
            </div>
            <div className="sectionNew">
                <div className="sectionNew__title">
                    Doodle mới
                </div>
                <div className="sectionNew__box">
                    {dataNewese.map(item=>(
                            <Link to={"/" + item.slug} className="sectionNew__box__innerBox" key={item._id}>
                                <div className="sectionNew__box__innerBox__image" style={{backgroundImage: `url(${item.image})`}}></div>
                                <div className="sectionNew__box__innerBox__line"></div>
                                <div className="sectionNew__box__innerBox__date">{item.time.dateString}</div>
                                <div className="sectionNew__box__innerBox__title">{item.title}</div>
                            </Link>
                    ))}
                </div>
            </div>
            <div className="sectionNew">
                <div className="sectionNew__title">
                    Doodle thịnh hành
                </div>
                <div className="sectionNew__box">
                    {dataPopular.map(item=>(
                            <Link to={"/" + item.slug} className="sectionNew__box__innerBox" key={item._id}>
                                <div className="sectionNew__box__innerBox__image" style={{backgroundImage: `url(${item.image})`}}></div>
                                <div className="sectionNew__box__innerBox__line"></div>
                                <div className="sectionNew__box__innerBox__date">{item.time.dateString}</div>
                                <div className="sectionNew__box__innerBox__title">{item.title}</div>
                            </Link>
                    ))}
                </div>
            </div>
            <div className="moreButton">
                <Link to={"/thuvien"}>
                    <div className="moreButton__more">
                        Xem thêm
                    </div>
                </Link>
            </div>
            <Line/>
            <div className="sectionCert">
                <div className="sectionCert__title">
                    Sản phẩm của chúng tôi an toàn
                </div>
                <div className="sectionCert__disc">
                    Sản phẩm này đã vượt qua bài kiểm tra về sự an toàn do các bên có thẩm quyền
                </div>
                <div className="sectionCert__detail">
                    Đảm bảo rằng VietDoodle Gallery là một phần mềm sạch 100%. Sản phẩm phần mềm này đã được kiểm tra kỹ lưỡng và được đánh giá là hoàn toàn sạch sẽ; do đó, nó có thể được cài đặt mà không cần quan tâm đến bất kỳ vấn đề bảo mật dự liệu nào
                </div>
            </div>

            {showModal && (
                <div className='home__backModal' onClick={() => setShowModal(false)}></div>
            )}
            {showModal && (
                <div className="home__modal" ref={modalRef}>
                    <div className='home__modal--buttonClose' onClick={() => setShowModal(false)}><IoMdCloseCircleOutline /></div>
                    <div className="home__modal--content" ref={modalContentRef}>
                        <img src={logo} className='home__modal--content__img'/>
                        <div className='home__modal--content__sanXuat'>
                            Sản phẩm được tạo bởi:
                        </div>
                        <div className='home__modal--content__name'>
                            Lê Hoàng Anh - B21DCPT044
                        </div>
                        <div className='home__modal--content__name'>
                            Đỗ Trung Hiếu - B21DCPT011
                        </div>
                        <div className='home__modal--content__name'>
                            Hoàng Thị Hồng Lê - B21DCPT139
                        </div>
                        <div className='home__modal--content__name'>
                            Đỗ Tuấn Minh - B21DCPT023
                        </div>
                        <div className='home__modal--content__name'>
                            Trịnh Xuân Phong - B21DCPT182
                        </div>
                        <div className='home__modal--content__name'>
                            Đỗ Đăng Tuân - B21DCPT225
                        </div>
                        <div className='home__modal--content__sanXuat'>
                            Chúng em cảm ơn sự hướng dẫn của cô:
                        </div>
                        <div className='home__modal--content__name'>
                            Giảng viên: Vũ Thị Tú Anh
                        </div>
                        <div className='home__modal--content__disc'>
                            <div className='home__modal--content__disc__innerDisc'>
                                Trang web sử dụng với mục đích phi thương mại, nếu có vấn đề về bản quyền vui lòng liên hệ: 0911080790
                            </div>
                            <div className='home__modal--content__disc__innerDisc'>
                                Trang web đang trong quá trình demo và kiểm thử vậy nên còn nhiều lỗi phát sinh trong quá trình sử dụng, mong các bạn bỏ qua và phản hồi lại với chúng tôi.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home;
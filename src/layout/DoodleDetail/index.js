import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import "./DoodleDetail.scss";
import Line from "../../components/Line";
import { getCookie } from "../../components/Cookies/Cookies";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

function DoodleDetail(){
    const params = useParams();
    const [dataTest, setDataTest] = useState([]);
    const [data, setData] = useState(null);
    const emailUser = getCookie("email");
    var idUser = null;
    var favoriteUser = [];
    const[idDoodle, setIdDoodle] = useState([]);

    const [showModalAdded, setShowModalAdded] = useState(false); // State để kiểm soát hiển thị modal
    const [showModalAdd, setShowModalAdd] = useState(false); // State để kiểm soát hiển thị modal
    const modalRef = useRef(null); // Ref cho modal
    const modalContentRef = useRef(null);

    useEffect(()=>{
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/`)
            .then(res=>res.json())
            .then(data => {
                setDataTest(data);

                const foundData = data.find(item => item.slug === params.id);
                setIdDoodle(foundData._id);
                if (foundData) {
                    // Nếu tìm thấy, thực hiện fetch API detail
                    fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/detail/${foundData._id}`)
                        .then(res => res.json())
                        .then(detailData => {
                            const newviews = detailData.views +1;
                            // Tăng giá trị đối tượng views
                            fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/${foundData._id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    views: `${newviews}`,
                                    status: 'true',
                                }),
                            })
                                .then(res => res.json())
                                .then(updatedData => {
                                    setData(detailData);
                                })
                                .catch(error => {
                                    console.error('Error increasing views:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error fetching doodle detail:', error);
                        });
                }
            })
    },[params.id]);

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
    if(dataUser){
        for(let i=0; i<dataUser.length; i++){
            if( dataUser[i].email === emailUser){
                idUser = dataUser[i]._id;
                favoriteUser = dataUser[i].favorite;
            }
        }
    }

    const [message, setMessage] = useState([]);
    const [infoUser, setInfoUser] = useState([]);

    const handleClick = (e) =>{

        for(let i=0; i< favoriteUser.length; i++){
            if(favoriteUser[i] === idDoodle){
                setIdDoodle(null);
                idUser = null;
                setShowModalAdded(true);
                break;
            }
        }
        if (idUser && idDoodle) {
            setShowModalAdd(true);
            const ans = [...favoriteUser, idDoodle];
            fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/user/favorite/${idUser}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        favorite: ans,
                    }),
                })
                .then(res => res.json())
                .then(updatedData => {
                    setMessage(updatedData);
                })
                .catch(error => {
                console.error('Error increasing views:', error);
            });

            fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/detail/${idDoodle}`)
                        .then(res => res.json())
                        .then(detailData => {
                            const newlikes = detailData.likes +1;
                            // Tăng giá trị đối tượng views
                            fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/${idDoodle}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    likes: `${newlikes}`,
                                    status: 'true',
                                }),
                            })
                                .then(res => res.json())
                                .then(updatedData => {
                                    setData(detailData);
                                })
                                .catch(error => {
                                    console.error('Error increasing views:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error fetching doodle detail:', error);
                        });
        }
    }

    const handleClickOutside = (event) => {
        // Kiểm tra xem click có xảy ra bên ngoài modal không
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModalAdded(false); // Nếu click bên ngoài modal, đóng modal
            setShowModalAdd(false); // Nếu click bên ngoài modal, đóng modal
        }
    };

    const handleEditClick = () => {
        setShowModalAdded(true); // Khi nhấn vào nút "Sửa", hiển thị modal
        setShowModalAdd(true); // Khi nhấn vào nút "Sửa", hiển thị modal
    }

    

    return(
        <>
            {data &&(
                <div className="detail">
                    {/* <div className="detail__image" style={{backgroundImage: `url(${data.image})`}}></div> */}
                    <div className="detail__add" onClick={handleClick}>Thêm</div>
                    <img className="detail__image" src={data.image}/>
                </div>
            )}
            <Line/>
            {data &&(
                <div className="date">
                    <div className="date__disc">
                        {data.time.dateString}
                    </div>
                    <div className="date__title">
                        {data.title}
                    </div>
                </div>
            )}
            <Line/>
            {data &&(
                <div className="des">
                    <div className="des__innerDes">
                        {data.description}
                    </div>
                </div>
            )}

            {showModalAdded && emailUser &&(
                <div className='home__backModal' onClick={() => setShowModalAdded(false)}></div>
            )}
            {showModalAdded && emailUser &&(
                <div className="home__modal" ref={modalRef}>
                    <div className='home__modal--buttonClose' onClick={() => setShowModalAdded(false)}><IoMdCloseCircleOutline /></div>
                    <div className="home__modal--content" ref={modalContentRef}>
                        <div className="home__modal--content__aleart">Doodle đã có sẵn trong bộ sưu tập! Hãy kiểm tra lại</div>
                        <div className="home__modal--content__invite">
                            Bạn muốn sử dụng dịch vụ của chúng tôi? Truy cập ngay extension:
                        </div>
                        <Link className='home__modal--content__link' to={"https://chromewebstore.google.com/?hl=vi"}>VietDoodle Gallery</Link>
                    </div>
                </div>
            )}

            {showModalAdd && emailUser &&(
                <div className='home__backModal' onClick={() => setShowModalAdd(false)}></div>
            )}
            {showModalAdd && emailUser &&(
                <div className="home__modal" ref={modalRef}>
                    <div className='home__modal--buttonClose' onClick={() => setShowModalAdd(false)}><IoMdCloseCircleOutline /></div>
                    <div className="home__modal--content" ref={modalContentRef}>
                        <div className="home__modal--content__aleart">Thêm Doodle thành công!</div>
                        <div className="home__modal--content__invite">
                            Bạn muốn sử dụng dịch vụ của chúng tôi? Truy cập ngay extension:
                        </div>
                        <Link className='home__modal--content__link' to={"https://chromewebstore.google.com/?hl=vi"}>VietDoodle Gallery</Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default DoodleDetail;
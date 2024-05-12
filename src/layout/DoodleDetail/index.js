import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DoodleDetail.scss";
import Line from "../../components/Line";
import { getCookie } from "../../components/Cookies/Cookies";

function DoodleDetail(){
    const params = useParams();
    const [dataTest, setDataTest] = useState([]);
    const [data, setData] = useState(null);
    const emailUser = getCookie("email");
    var idUser = null;
    var favoriteUser = [];
    const[idDoodle, setIdDoodle] = useState([]);

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
                break;
            }
        }
        if (idUser && idDoodle) {
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

    return(
        <>
            {data &&(
                <div className="detail">
                <div className="detail__image" style={{backgroundImage: `url(${data.image})`}}></div>
                <div className="detail__add" onClick={handleClick}>Thêm</div>
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
        </>
    )
}

export default DoodleDetail;
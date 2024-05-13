import './CongCu.scss';
import { useState, useEffect } from 'react';
import { getCookie } from "../../components/Cookies/Cookies";
import { Link } from "react-router-dom";

function CongCu(){
    const emailUser = getCookie("email");
    const [dataBst, setDataBst] = useState([]);
    const [dataBstDoodle, setDataBstDoodle] = useState([]);
    const[idUser, setIdUser] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userDataResponse = await fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/user/`);
            const userData = await userDataResponse.json();
            const findUser = userData.find(item => item.email === emailUser);
            setIdUser(findUser._id);
            if (findUser) {
                setDataBst(findUser.favorite);
                await fetchDataDoodle(findUser.favorite);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const fetchDataDoodle = async (favoriteDoodles) => {
        try {
            const doodleDataResponse = await fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/newest`);
            const doodleData = await doodleDataResponse.json();
            const doodles = doodleData.filter(item => favoriteDoodles.includes(item._id));
            setDataBstDoodle(doodles);
        } catch (error) {
            console.error("Error fetching doodle data:", error);
        }
    }

    const [message, setMessage] = useState([]);
    const handleClick = (id) => {
        const ans = dataBst.filter(item => item !== id);
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
                setDataBstDoodle(prevData => prevData.filter(item => item._id !== id));
            })
            .catch(error => {
            console.error('Error increasing views:', error);
        });
    }

    return(
        <>
            <div className="bst">
                <div className="bst__title">Bộ sưu tập</div>
                <div className="bst__disc">
                    Quản lý bộ sưu tập Doodle ưa thích của bạn một cách dễ dàng, nếu bạn muốn xóa chúng, hãy nhấn vào biểu tượng "X".
                </div>
            </div>
            <div className="sectionNew__box">
                {dataBstDoodle.map(item=>(
                    <div className="sectionNew__box__innerBox" key={item._id}>
                        <Link to={"/" + item.slug} className="sectionNew__box__innerBox__image" style={{backgroundImage: `url(${item.image})`}}></Link>
                        <div className="sectionNew__box__innerBox__line"></div>
                        <div className="sectionNew__box__innerBox__date">{item.time.dateString}</div>
                        <Link to={"/" + item.slug} className="sectionNew__box__innerBox__title">{item.title}</Link>
                        <div className='sectionNew__box__innerBox__delete' onClick={() => handleClick(item._id)}>X</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CongCu;
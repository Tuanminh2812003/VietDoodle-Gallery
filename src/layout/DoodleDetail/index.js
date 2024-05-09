import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DoodleDetail.scss";
import Line from "../../components/Line";

function DoodleDetail(){
    const params = useParams();
    const [dataTest, setDataTest] = useState([]);
    const [data, setData] = useState(null);

    useEffect(()=>{
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/`)
            .then(res=>res.json())
            .then(data => {
                setDataTest(data);

                const foundData = data.find(item => item.slug === params.id);
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

    return(
        <>
            {data &&(
                <div className="detail">
                <div className="detail__image" style={{backgroundImage: `url(${data.image})`}}></div>
                <div className="detail__add">Thêm</div>
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
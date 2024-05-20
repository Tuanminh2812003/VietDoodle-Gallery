import React, { useState } from "react";
import "./HuongDan.scss";
import video1 from "../../video/1.mp4";
import video2 from "../../video/2.mp4";
import video3 from "../../video/3.mp4";
import video4 from "../../video/4.mp4";
import video5 from "../../video/5.mp4";
import { IoIosArrowForward } from "react-icons/io";

function HuongDan() {
    const [activeVideo, setActiveVideo] = useState(null);

    const handleBoxClick = (videoIndex) => {
        setActiveVideo(videoIndex);
    };

    return (
        <>
            <div className="huongDan">
                <div className="huongDan__title">Hướng dẫn</div>
                <div className="huongDan__disc">Hướng dẫn người dùng sử dụng extension và hơn thế nữa (Chưa hoàn thiện)</div>
                <div className="huongDan__innerHuongDan">
                    <div className="huongDan__innerHuongDan__bar">
                        <div 
                            className={`huongDan__innerHuongDan__bar__box ${activeVideo === 1 ? "active" : ""}`} 
                            onClick={() => handleBoxClick(1)}
                        >
                            Cách cài đặt extension VietDoodle Gallery<IoIosArrowForward />
                        </div>
                        <div 
                            className={`huongDan__innerHuongDan__bar__box ${activeVideo === 2 ? "active" : ""}`} 
                            onClick={() => handleBoxClick(2)}
                        >
                            Cách thêm Doodle vào bộ sưu tập yêu thích<IoIosArrowForward />
                        </div>
                        <div 
                            className={`huongDan__innerHuongDan__bar__box ${activeVideo === 3 ? "active" : ""}`} 
                            onClick={() => handleBoxClick(3)}
                        >
                            Cách tải Doodle của bản thân<IoIosArrowForward />
                        </div>
                        <div 
                            className={`huongDan__innerHuongDan__bar__box ${activeVideo === 4 ? "active" : ""}`} 
                            onClick={() => handleBoxClick(4)}
                        >
                            Các chế độ điều chỉnh Doodle<IoIosArrowForward />
                        </div>
                        <div 
                            className={`huongDan__innerHuongDan__bar__box ${activeVideo === 5 ? "active" : ""}`} 
                            onClick={() => handleBoxClick(5)}
                        >
                            Cách chơi game trên Doodle<IoIosArrowForward />
                        </div>
                    </div>
                    <div className="huongDan__innerHuongDan__video">
                        <iframe 
                            width="90%" 
                            height="420px" 
                            src="https://www.youtube.com/embed/IfgfaBFp7ro?si=H68pz2XD6wyFD1Od" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen 
                            className={activeVideo ? "hidden" : ""}
                        ></iframe>
                        <video width="90%" height="420px" controls className={activeVideo === 1 ? "" : "hidden"}>
                            <source src={video1} type="video/ogg" />
                        </video>
                        <video width="90%" height="420px" controls className={activeVideo === 2 ? "" : "hidden"}>
                            <source src={video2} type="video/ogg" />
                        </video>
                        <video width="90%" height="420px" controls className={activeVideo === 3 ? "" : "hidden"}>
                            <source src={video3} type="video/ogg" />
                        </video>
                        <video width="90%" height="420px" controls className={activeVideo === 4 ? "" : "hidden"}>
                            <source src={video4} type="video/ogg" />
                        </video>
                        <video width="90%" height="420px" controls className={activeVideo === 5 ? "" : "hidden"}>
                            <source src={video5} type="video/ogg" />
                        </video>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HuongDan;

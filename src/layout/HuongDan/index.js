import "./HuongDan.scss"

function HuongDan(){
    return(
        <>
            <div className="huongDan">
                <div className="huongDan__title">Hướng dẫn</div>
                <div className="huongDan__disc">Hướng dẫn người dùng sử dụng extension và hơn thế nữa (Chưa hoàn thiện)</div>
                <iframe width="90%" height="655px" src="https://www.youtube.com/embed/IfgfaBFp7ro?si=H68pz2XD6wyFD1Od" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </>
    )
}

export default HuongDan;
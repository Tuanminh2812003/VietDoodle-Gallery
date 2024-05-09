import "./ThuVien.scss";
import { MdOutlineSavedSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Line from "../../components/Line";

function ThuVien(){

    const limit = 9;
    const [quantityPage, setQuantityPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleDataNewese, setVisibleDataNewese] = useState([]);
    const [dataRandom, setDataRandom] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [dataNewese, setDataNewese] = useState([]);

    const [selectDay, setSelectDay] = useState([]);
    const [uniqueDatesArray, setUniqueDatesArray] = useState([]);

    const [selectFormat, setSeclectFormat] = useState([]);
    const [uniqueFormatArray, setUniqueFormatArray] = useState([]);

    const [selectCate, setSeclectCate] = useState([]);
    const[uniqueCateArray, setUniqueCateArray] = useState([]);

    const [selectMode, setSelectMode] = useState([]);

    useEffect(() => {
        fetchDataRandom();
        fetchDataNewest();
        fetchDataCate();
    }, []);

    const fetchDataRandom = () => {
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/`)
            .then(res => res.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomDoodle = data[randomIndex];
                setDataRandom(randomDoodle);
            })
            .catch(error => console.error("Error fetching random doodle: ", error));
    };

    const fetchDataNewest = () => {
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/newest`)
            .then(res => res.json())
            .then(data => {
                const uniqueDateStrings = new Set(data.map(item => item.time.dateString));
                const uniqueDatesArray = Array.from(uniqueDateStrings).sort((a, b) => {
                    // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
                    const dateA = new Date(a.split('/').reverse().join('/'));
                    const dateB = new Date(b.split('/').reverse().join('/'));
                    // So sánh đối tượng Date
                    return dateA - dateB;
                });
                setUniqueDatesArray(uniqueDatesArray);

                const uniqueFormatStrings = new Set(data.map(item => item.format));
                const uniqueFormatArray = Array.from(uniqueFormatStrings);
                setUniqueFormatArray(uniqueFormatArray);

                setQuantityPage(Math.ceil(data.length / limit));
                setDataNewese(data);
            })
            .catch(error => console.error("Error fetching newest doodles: ", error));
    };

    const fetchDataCate = () => {
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/category`)
            .then(res => res.json())
            .then(data => {
                const uniqueCateStrings = new Set(data.map(item => item.title));
                const uniqueCateArray = Array.from(uniqueCateStrings);
                setUniqueCateArray(uniqueCateArray);
            })
            .catch(error => console.error("Error fetching newest doodles: ", error));
    };

    const filterData = (searchTerm, page) => {
        if (dataNewese.length === 0) return;
        
        const filteredData = dataNewese.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        // Tính số trang dựa trên kết quả tìm kiếm
        const numberOfPages = Math.ceil(filteredData.length / limit);
        setQuantityPage(numberOfPages);
    
        // Chỉ hiển thị các đối tượng trên trang hiện tại
        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, filteredData.length);
        const pageData = filteredData.slice(startIndex, endIndex);
        setVisibleDataNewese(pageData); // Cập nhật lại dữ liệu visibleDataNewese
    };

    useEffect(() => {
        // Gọi hàm filterData khi có sự thay đổi trong searchTerm hoặc currentPage
        if (searchTerm !== "" || currentPage !== 1 || dataNewese.length > 0) {
            filterData(searchTerm, currentPage);
        }
    }, [searchTerm, currentPage, dataNewese]);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
        filterData(searchTerm, page); // Lọc dữ liệu khi chuyển trang
    }
    
    const handleChange = (e) => {
        setSearchTerm(e.target.value); // Cập nhật searchTerm khi người dùng nhập
    };

    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
            setCurrentPage(parseInt(storedPage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

    return(
        <>
            <div className="thuVien">
                <div className="thuVien__title">
                    Thư viện Doodle
                </div>
                <div className="thuVien__disc">
                    Sử dụng bộ sưu tập Doodle miễn phí của chúng tôi! Để thêm chúng vào tiện ích mở rộng VietDoodle Gallery - chỉ cần nhấp vào nút "Thêm". Sau đó, chúng sẽ có sẵn để bạn chọn trong cửa sổ bật lên tiện ích mở rộng.
                </div>
                <div className="thuVien__disc">
                Để xem chi tiết thông tin Doodle, hãy nhấn vào chúng!
                </div>
            </div>
            <div className="search">
                <div className="search__innerSearch">
                    <MdOutlineSavedSearch className="search__innerSearch__icon"/>
                    <input
                        placeholder="Tìm Doodle"
                        className="search__innerSearch__input"
                        onChange={handleChange}
                        value={searchTerm}
                        name="timkiem"
                    />
                    {dataRandom && (
                        <Link to={"/" + dataRandom.slug} className="search__innerSearch__button">
                            Ngẫu nhiên
                        </Link>
                    )}
                </div>
            </div>
            <div className="line_father--up">
                <Line />
            </div>
            <div className="selectSection">
                <select name="days" id="days" onChange={(e) => setSelectDay(e.target.value)}>
                    <option key="" value="">
                        Ngày
                    </option>
                    {uniqueDatesArray.map(dateString => {
                        const [day, month] = dateString.split('/');
                        const formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
                        return <option key={dateString} value={dateString}>{formattedDate}</option>;
                    })}
                </select>
                <select name="format" id="format" onChange={(e) => setSeclectFormat(e.target.value)}>
                    <option key="" value="">
                        Định dạng
                    </option>
                    {uniqueFormatArray.map(format => (
                        <option key={format} value={format}>{format}</option>
                    ))}
                </select>
                <select name="cate" id="cate" onChange={(e) => setSeclectCate(e.target.value)}>
                    <option key="" value="">
                        Thể loại
                    </option>
                    {uniqueCateArray.map(cate => (
                        <option key={cate} value={cate}>{cate}</option>
                    ))}
                </select>
                <select className="selectSection--borderRight" name="mode" id="mode" onChange={(e) => setSelectMode(e.target.value)}>
                    <option key="moinhat" value="moinhat">
                        Mới nhất
                    </option>
                    <option key="cunhat" value="cunhat">
                        Cũ nhất
                    </option>
                    <option key="atoz" value="atoz">
                        Từ a-z
                    </option>
                    <option key="ztoa" value="ztoa">
                        Từ z-a
                    </option>
                </select>
            </div>
            <div className="line_father">
                <Line />
            </div>
            <div className="pagi">
                <div className="pagination">
                    {quantityPage &&
                        Array.from({ length: quantityPage }, (_, index) => index + 1).map(page => (
                            <button 
                                key={page} 
                                onClick={() => setCurrentPage(page)}
                                className={`pagination__page ${currentPage === page ? "activePage" : ""}`}
                            >
                                {page}
                            </button>
                        ))}
                </div>
            </div>
            <div className="sectionNew">
                <div className="sectionNew__box">
                    {visibleDataNewese.map(item => (
                        <Link to={"/" + item.slug} className="sectionNew__box__innerBox" key={item._id}>
                            <div className="sectionNew__box__innerBox__image" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className="sectionNew__box__innerBox__line"></div>
                            <div className="sectionNew__box__innerBox__date">{item.time.dateString}</div>
                            <div className="sectionNew__box__innerBox__title">{item.title}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ThuVien;
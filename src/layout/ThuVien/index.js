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
    const[dataCate, setDataCate] = useState([]);
    const[dataBase, setDataBase] = useState([]);

    const [uniqueDatesArray, setUniqueDatesArray] = useState([]);

    const [uniqueFormatArray, setUniqueFormatArray] = useState([]);

    const[uniqueCateArray, setUniqueCateArray] = useState([]);

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("");
    const [selectedCate, setSelectedCate] = useState("");
    const [selectedSort, setSelectedSort] = useState("moinhat"); // Thiết lập mặc định cho ô select sắp xếp

    const [data, setData] = useState(null); // State để lưu dữ liệu fetch

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
                const date = Array.from(uniqueDateStrings).sort((a, b) => {
                    // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
                    const dateA = new Date(a.split('/').reverse().join('/'));
                    const dateB = new Date(b.split('/').reverse().join('/'));
                    // So sánh đối tượng Date
                    return dateA - dateB;
                });
                setUniqueDatesArray(date);

                const uniqueFormatStrings = new Set(data.map(item => item.format));
                const uniqueFormatArray = Array.from(uniqueFormatStrings);
                setUniqueFormatArray(uniqueFormatArray);

                setQuantityPage(Math.ceil(data.length / limit));
                setDataNewese(data);
                setDataBase(data);
            })
            .catch(error => console.error("Error fetching newest doodles: ", error));
    };
    const fetchDataCate = () => {
        fetch(`https://google-doodle-v2-v2.vercel.app/api/v1/category`)
            .then(res => res.json())
            .then(data => {
                setDataCate(data);
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

    const selectSort = (e) =>{
        const sort = e.target.value;
        setSelectedSort(sort);
        setSelectedDay(""); // Đặt giá trị của ô select ngày về trống
        setSelectedFormat(""); // Đặt giá trị của ô select định dạng về trống
        setSelectedCate(""); // Đặt giá trị của ô select thể loại về trống
        let sortedData = [...dataBase]; // Copy dataBase array
        if(sort === "atoz"){
            sortedData.sort((a, b) => a.slug.localeCompare(b.slug));
        } else if(sort === "ztoa"){
            sortedData.sort((a, b) => b.slug.localeCompare(a.slug));
        } else if(sort === "moinhat"){
            sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if(sort === "cunhat"){
            sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setDataNewese(sortedData);
        filterData(searchTerm, currentPage, sortedData);
    }

    const selectDay = (e) => {
        const date = e.target.value;
        console.log(date);
        setSelectedDay(date);
        setSelectedFormat(""); // Đặt giá trị của ô select định dạng về trống
        setSelectedCate(""); // Đặt giá trị của ô select thể loại về trống
        setSelectedSort("moinhat"); // Đặt giá trị của ô select sắp xếp về mặc định
        if (date === "") {
            setDataNewese(dataBase);
            filterData(searchTerm, currentPage);
        } else {
            // Ngược lại, lọc dữ liệu dựa trên ngày đã chọn
            if(date === "nospecial"){
                const filteredData = dataBase.filter(item => item.time.dateString === "");
                setDataNewese(filteredData);
                // Cập nhật lại số lượng trang dựa trên dữ liệu đã lọc
                filterData(searchTerm, currentPage);
            } else{
                const filteredData = dataBase.filter(item => item.time.dateString === date);
                setDataNewese(filteredData);
                // Cập nhật lại số lượng trang dựa trên dữ liệu đã lọc
                filterData(searchTerm, currentPage);
            }
        }
    };

    const selectFormat = (e) =>{
        const format = e.target.value;
        setSelectedFormat(format);
        setSelectedDay(""); // Đặt giá trị của ô select ngày về trống
        setSelectedCate(""); // Đặt giá trị của ô select thể loại về trống
        setSelectedSort("moinhat"); // Đặt giá trị của ô select sắp xếp về mặc định
        if (format === "") {
            setDataNewese(dataBase);
            filterData(searchTerm, currentPage);
        } else {
            const filteredData = dataBase.filter(item => item.format === format);
            setDataNewese(filteredData);
            filterData(searchTerm, currentPage);
        }
    }
    const selectCate = (e) =>{
        const cate = e.target.value;
        setSelectedCate(cate);
        setSelectedDay(""); // Đặt giá trị của ô select ngày về trống
        setSelectedFormat(""); // Đặt giá trị của ô select định dạng về trống
        setSelectedSort("moinhat"); // Đặt giá trị của ô select sắp xếp về mặc định
        var filteredData2= [];
        if (cate === "") {
            setDataNewese(dataBase);
            filterData(searchTerm, currentPage);
        } else {
            const filteredData = dataCate.filter(item => item.title === cate);
            for(let i=0; i< dataBase.length; i++){
                for(let j=0; j< dataBase[i].doodle_category_id.length; j++){
                    if(dataBase[i].doodle_category_id[j] === filteredData[0]._id){
                        filteredData2.push(dataBase[i])
                    }
                }
            }
            setDataNewese(filteredData2);
            filterData(searchTerm, currentPage);
        }
    }

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
                <select name="days" id="days" value={selectedDay} onChange={selectDay}>
                    <option key="" value="">
                        Ngày
                    </option>
                    {uniqueDatesArray.map(dateString => {
                        if (/\d{2}\/\d{2}/.test(dateString)) {
                            const [day, month] = dateString.split('/');
                            const formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
                            return <option key={dateString} value={dateString}>{formattedDate}</option>;
                        } else {
                            return <option key={dateString} value={dateString}>Ngày bình thường</option>;
                        }
                    })}
                </select>
                <select name="format" id="format" value={selectedFormat} onChange={selectFormat}>
                    <option key="" value="">
                        Định dạng
                    </option>
                    {uniqueFormatArray.map(format => (
                        <option key={format} value={format}>{format}</option>
                    ))}
                </select>
                <select name="cate" id="cate" value={selectedCate} onChange={selectCate}>
                    <option key="" value="">
                        Thể loại
                    </option>
                    {uniqueCateArray.map(cate => (
                        <option key={cate} value={cate}>{cate}</option>
                    ))}
                </select>
                <select className="selectSection--borderRight" name="mode" id="mode" value={selectedSort} onChange={selectSort}>
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
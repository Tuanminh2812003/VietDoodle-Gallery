import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutDefault from "./layout/LayoutDefault";
import Home from "./layout/Home";
import ThuVien from "./layout/ThuVien";
import CongCu from "./layout/CongCu";
import HuongDan from "./layout/HuongDan";
import DoodleDetail from "./layout/DoodleDetail";
import DangNhap from "./layout/DangNhap";
import DangXuat from "./layout/DangXuat";
import DangKy from "./layout/DangKy";
import PrivacyPolicy from "./layout/PrivacyPolicy";
import SuKien from "./layout/SuKien";
import EditUser from "./layout/EditUser";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutDefault/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/thuvien' element={<ThuVien/>}/>
          <Route path=':id' element={<DoodleDetail/>}/>
          <Route path='/congcu' element={<CongCu/>}/>
          <Route path='/huongdan' element={<HuongDan/>}/>
          <Route path='/dangnhap' element={<DangNhap/>}/>
          <Route path='/dangxuat' element={<DangXuat/>}/>
          <Route path='/dangky' element={<DangKy/>}/>
          <Route path='/privacy' element={<PrivacyPolicy/>}/>
          <Route path='/sukien' element={<SuKien/>}/>
          <Route path='/taikhoan' element={<EditUser/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;

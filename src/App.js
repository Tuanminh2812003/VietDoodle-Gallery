import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutDefault from "./layout/LayoutDefault";
import Home from "./layout/Home";
import ThuVien from "./layout/ThuVien";
import CongCu from "./layout/CongCu";
import HuongDan from "./layout/HuongDan";
import DoodleDetail from "./layout/DoodleDetail";
import DangNhap from "./layout/DangNhap";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;

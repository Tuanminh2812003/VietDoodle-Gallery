import {combineReducers} from "redux";
import DangNhapReducer from "./DangNhap";

const allReducers = combineReducers({
    DangNhapReducer,
})

export default allReducers;
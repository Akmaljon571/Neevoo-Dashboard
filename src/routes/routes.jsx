import { Route, Routes } from "react-router-dom";
import { Xisobot } from "../page";
import Category from "../page/category";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Xisobot />} />
      <Route path="/category" element={<Category />} />
    </Routes>
  );
}

export default Routers;

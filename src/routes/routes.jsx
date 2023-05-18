import { Route, Routes } from "react-router-dom";
import { Xisobot, Course, Videos, Category } from "../page";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Xisobot />} />
      <Route path="/course" element={<Course />} />
      <Route path="/category" element={<Category />} />
      <Route path="/video" element={<Videos />} />
    </Routes>
  );
}

export default Routers;

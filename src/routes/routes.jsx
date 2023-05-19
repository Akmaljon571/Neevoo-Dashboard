import { Route, Routes } from "react-router-dom";
import { Xisobot, Course, Videos, Category, Users } from "../page";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Xisobot />} />
      <Route path="/course" element={<Course />} />
      <Route path="/category" element={<Category />} />
      <Route path="/video" element={<Videos />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}
export default Routers;

import { Route, Routes } from "react-router-dom";
import { Xisobot, Course, Videos } from "../page";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Xisobot />} />
      <Route path="/course" element={<Course />} />
      <Route path="/video" element={<Videos />} />
    </Routes>
  );
}
export default Routers;

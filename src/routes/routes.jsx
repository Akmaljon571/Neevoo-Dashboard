import { Route, Routes } from "react-router-dom";
import { Xisobot } from "../page";
import Course from "../page/Course/course";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Xisobot />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
}

export default Routers;

import { Route, Routes } from "react-router-dom";
import { Videos, Xisobot } from "../page";

function Routers() {
    return (  
        <Routes>
            <Route path="/" element={<Xisobot />} />
            <Route path="/video" element={<Videos />} />
        </Routes>

    );
}

export default Routers;
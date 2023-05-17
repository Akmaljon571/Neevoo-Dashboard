import { Route, Routes } from "react-router-dom";
import { Xisobot } from "../page";

function Routers() {
    return (  
        <Routes>
            <Route path="/" element={<Xisobot />} />
            {/* <Route path="/" element={} /> */}
        </Routes>

    );
}

export default Routers;
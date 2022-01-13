import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewStudent } from "./pages/NewStudent";
import { Register } from "./pages/Register";

export const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/new-student" element={<NewStudent />} />
            </Routes>
        </BrowserRouter>
    );
}
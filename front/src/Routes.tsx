import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./Auth/AuthContext";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import Cadastro from "./pages/Cadastro/Cadastro";
import AtualizaCadastro from "./pages/Cadastro/AtualizaCadastro";
import VisualizaCadastro from "./pages/Cadastro/VisualizaCadastro";
import Principal from "./pages/principal/Principal";
import Register from "./pages/Login/Register";

const AdminRoutes = () => {
    const { authenticated, user } = useAuth();

    return (
        authenticated && user && user.role != '' ? <Outlet /> : <Navigate to="/login" />
    )
};

const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<><Login /></>} />
                    <Route path="/registro" element={<><Register/></>} />
                    <Route element={<AdminRoutes />}>
                        <Route path="/:tipo" element={<><Navbar /><Principal/></>} />
                        <Route path="/erros/:tipo" element={<><Navbar /><Principal/></>} />
                        <Route path="/cadastro" element={<><Navbar /><Cadastro /></>} />
                        <Route path="/atualizar/:id" element={<><Navbar /><AtualizaCadastro /></>} />
                        <Route path="/visualiza/:id" element={<><Navbar /><VisualizaCadastro /></>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default AppRoutes;
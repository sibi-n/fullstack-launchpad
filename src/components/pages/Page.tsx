import { Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage";
import LoginPage from "./LoginPage";
import AuthLayout from "../layouts/AuthLayout";

function Pages() {

    return <div>
        <Routes>
            <Route path="auth" element={<AuthLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
            </Route>

            <Route path="app">
                <Route path="search" element={<SearchPage/>}/>
            </Route>
        </Routes>
    </div>;
}

export default Pages;
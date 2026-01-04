import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./Home";
import Login from "./Login";
import Account from "./Account";
import Register from "./Register";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="account">
                        <Route index element={<Account />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;

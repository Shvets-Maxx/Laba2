import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "../src/pages/mainPage/MainPage";
import Table from "./components/Table/TablePage";
function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index path="/" element={<Table />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

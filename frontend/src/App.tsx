import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "../src/pages/mainPage/MainPage";
import Table from "./pages/Table/TablePage";
import EcoTaxPage from "./pages/calculator/EcoTaxPage";
function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index path="/" element={<Table />} />
                    <Route path="/ecotax" element={<EcoTaxPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

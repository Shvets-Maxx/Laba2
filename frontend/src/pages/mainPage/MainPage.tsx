import style from "./MainPage.module.sass";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className={style.dashboard}>
            <div className={style.dashboard__container}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
//

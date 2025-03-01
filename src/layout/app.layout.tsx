import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const AppLayout = () => {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="pt-10">
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>

        </>

    )
}

export default AppLayout;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.page";
import ExplorePage from "../pages/explore.page";
import AppLayout from "../layout/app.layout";
import LoginPage from "../pages/login.page";
import RegisterPage from "../pages/register.page";
import AboutPage from "../pages/about.page";
import ContactPage from "../pages/contact.page";
import ProfilePage from "../pages/profile.page";
import CommunityPage from "../pages/community.page";
import EventsPage from "../pages/events.page";
import MessagesPage from "../pages/messages.page";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" index element={<HomePage/>}/>
                    <Route path="/explore" element={<ExplorePage/>}/>
                    <Route path="/community" element={<CommunityPage/>}/>
                    <Route path="/events" element={<EventsPage/>}/>
                    <Route path="/messages" element={<MessagesPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/profile/:id" element={<ProfilePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
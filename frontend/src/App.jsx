import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
import Blog from "./pages/Blog";
import PrivateRouting from "./components/PrivateRouting";
import DashboardAdmin from "./pages/DashboardAdmin";
import BlogAdmin from "./pages/BlogAdmin";
import UsersAdmin from "./pages/UsersAdmin";
import ProfileUser from "./pages/ProfileUser";
import Liked from "./pages/Liked";
import BlogRead from "./pages/BlogRead";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/read/:id" element={<BlogRead/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRouting />}>
          <Route path="/profile" element={<UserProfile />}>
            <Route path="profileuser" element={<ProfileUser />} />
            <Route path="liked" element={<Liked />} />
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="blogs" element={<BlogAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

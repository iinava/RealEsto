import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar/Navbar";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./src/context/AuthContext";

function Layout() {
  return (
    <div className="layout w-full  ">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="  ">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout  ">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="  ">
        <Outlet />
      </div>
    </div>
  );
}
export { Layout, RequireAuth };

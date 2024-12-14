import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage to log out
    localStorage.removeItem("isAuthenticated");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/attendance"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Attendance
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/employees"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Employees
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/course"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Course
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/video-library"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Video Library
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/batches"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Batches
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/assessment"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Assessment
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            onClick={handleLogout}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

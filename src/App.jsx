import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Login from "./screens/auth/Login";
import Dashboard from "./screens/dashboard";
import Attendance from "./screens/attendance";
import Employees from "./screens/employees";
import BatchManagement from "./screens/batches";
import AssessmentManagement from "./screens/assessment";
import Courses from "./screens/courses";
import Training from "./screens/trainings";

// Layout for authenticated users
const Layout = () => {
  console.log("Layout Rendered");
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      {/* <Route element={<PrivateRoute />}> */}
      {/* Layout for authenticated users */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/batches" element={<BatchManagement />} />
        <Route path="/trainings" element={<Training />} />
        <Route path="/assessment" element={<AssessmentManagement />} />
        <Route path="/courses" element={<Courses />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
};

export default App;

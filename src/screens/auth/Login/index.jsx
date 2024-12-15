import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import AuthService from './AuthService';
import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = await AuthService.login(username, password);
  
      if (!token) {
        throw new Error("Login failed. No token received.");
      }
  
      const myDecodedToken = decodeToken(token?.access);
      const isMyTokenExpired = isExpired(token?.refresh);
  
      if (isMyTokenExpired) {
        throw new Error("Session expired. Please login again.");
      }
  
      const currentUserId = myDecodedToken?.user_id;
      
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("currentUser_id", currentUserId);
  
      const response = await axios.post(`${API_URL}/auth/jwt/verify/`, {
        token: token?.access,
      });
  
      if (response.status === 200) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        throw new Error("Token verification failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.detail || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

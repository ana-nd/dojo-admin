import React from 'react';
import { Navigate } from 'react-router-dom';

// Example private route component
// const PrivateRoute = ({ children }) => {
// console.log('PrivateRoute');
//   const isAuthenticated = localStorage.getItem('isAuthenticated'); // Replace with actual auth check
//     console.log(isAuthenticated)
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />; // Redirect to login if not authenticated
//   }

//   return children; // Return children if authenticated
// };

const PrivateRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("Redirecting to login");
    return <Navigate to="/login" />;
  }

  return children;
};


export default PrivateRoute;

import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();  // Fixed typo
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    // axios.get('http://localhost:3000/auth/logout')
    axios.get('https://singh-hrms-pb96-1rq4nnt30-anuj-singhs-projects-59a76acf.vercel.app/?vercelToolbarCode=G4dEUZ0lHHls_se')
      .then((result) => {
        if (result.data.Status) { 
          localStorage.removeItem("valid");
          navigate('/');
        } else {
          alert('Logout failed: ' + result.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        alert('An error occurred during logout.');
      });
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/dashboard/employee', label: 'Manage Employees', icon: 'bi-people' },
    { path: '/dashboard/category', label: 'Category', icon: 'bi-columns' },
    { path: '/dashboard/profile', label: 'Profile', icon: 'bi-person' },
  ];

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Singh HRMS
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {menuItems.map(item => (
                <li className="w-100" key={item.path}>
                  <Link
                    to={item.path}
                    className="nav-link text-white px-0 align-middle"
                    aria-label={item.label}
                  >
                    <i className={`fs-4 bi ${item.icon} ms-2`}></i>
                    <span className="ms-2 d-none d-sm-inline">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

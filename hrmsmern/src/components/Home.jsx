import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchData('http://localhost:3000/auth/admin_count', (data) => setAdminTotal(data[0].admin), 'Failed to fetch admin count');
    fetchData('http://localhost:3000/auth/employee_count', (data) => setemployeeTotal(data[0].employee), 'Failed to fetch employee count');
    fetchData('http://localhost:3000/auth/salary_count', (data) => setSalaryTotal(data[0].salaryOFEmp), 'Failed to fetch salary count');
    fetchData('http://localhost:3000/auth/admin_records', setAdmins, 'Failed to fetch admin records');
  }, []);

  const fetchData = async (url, setState, errorMessage) => {
    try {
      const result = await axios.get(url);
      if (result.data.Status) {
        setState(result.data.Result);
      } else {
        alert(result.data.Error || errorMessage);
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      alert(errorMessage || 'An error occurred.');
    }
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((a) => (
                <tr key={a.email}>
                  <td>{a.email}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">Edit</button>
                    <button className="btn btn-warning btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">No admins found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

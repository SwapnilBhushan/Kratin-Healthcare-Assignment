import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { Link, Outlet, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span class="fs-5 d-none d-sm-inline">Sunita Sharma</span>
              </a>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li class="nav-item">
                  <a href="/" class="nav-link align-middle px-0">
                    <i class="fs-4 bi-house"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/labReport"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-4 bi-speedometer2"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline">Medical History</span>{" "}
                  </Link>
                  <ul
                    class="collapse show nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  ></ul>
                </li>
                <li>
                  <Link to="/healthStatus" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-people"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline">
                      Know Your Health
                    </span>{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/medicalReport"
                    className="nav-link align-middle px-0"
                  >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">
                      Update Lab Report
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/bmiCalculator"
                    className="nav-link align-middle px-0"
                  >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">
                      BMI Calculator
                    </span>
                  </Link>
                </li>
                <li>
                  <a href="#" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-people"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline">Logout</span>
                  </a>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h3>Health Care Portal</h3>
            </div>

            <div>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

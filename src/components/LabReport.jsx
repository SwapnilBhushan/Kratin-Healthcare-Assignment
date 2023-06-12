import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Image.css";
const LabReport = () => {
  //to show the uploaded report from database

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2020/showReport")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          alert("Erorr");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:2020/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Erorr");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Sr. No. </th>
              <th>Lab Report</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((report, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      <img
                        src={`http://localhost:2020/images/` + report.image}
                        alt=""
                        className="report_image"
                      />
                    }
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(report.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabReport;

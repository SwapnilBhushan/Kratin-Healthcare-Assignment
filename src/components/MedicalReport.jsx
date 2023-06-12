import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import LabReport from "./LabReport";

const MedicalReport = () => {
  const [data, setData] = useState({
    image: "",
  });
  const [success, setSuccess] = useState(false); // State variable for success status
  const navigate = useNavigate();

  //uploaded report goes to server
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData();
    formData.append("image", data.image);
    axios
      .post("http://localhost:2020/medicalReport", formData)
      .then((res) => {
        console.log(res);
        setSuccess(true); // Set success status to true if the upload is successful
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Upload Medical Report</h2>
      {success && (
        <div className="alert alert-success">
          Medical Report Uploaded successfully!!!!
        </div>
      )}
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12 mb-3">
          <label htmlFor="inputImage" className="form-label">
            <h4>Upload New Medical Report</h4>
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Upload Image"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update Medical Report
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default MedicalReport;

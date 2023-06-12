import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const HealthStatus = () => {
  const [data, setData] = useState({
    glucoseLevel: "",
    oxygenLevel: "",
    heartRate: "",
    bloodPressure: "",
  });

  const [result, setResult] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { glucoseLevel, oxygenLevel, heartRate, bloodPressure } = data;

    const healthData = {
      glucoseLevel,
      oxygenLevel,
      heartRate,
      bloodPressure,
    };

    //this will send the users data to backend and takes response from backend
    try {
      const response = await axios.post(
        "http://localhost:2020/calculateHealthStatus",
        healthData
      );

      if (response.status === 200) {
        const results = response.data;
        setResult(results);

        if (Object.values(results).some((status) => status === "Abnormal")) {
          setShowModal(true);
        }
      } else {
        throw new Error("Error calculating health status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <div className="d-flex flex-column align-items-center pt-4">
          <h3>Update Your Health Inputs</h3>
          <form className="row g-3 w-50" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="glucoseLevel" className="form-label">
                Glucose Level
              </label>
              <input
                type="name"
                className="form-control"
                id="glucoseLevel"
                placeholder="Enter Your Glucose Level"
                onChange={(e) =>
                  setData({ ...data, glucoseLevel: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlFor="oxygenLevel" className="form-label">
                Oxygen Level (SPo2)
              </label>
              <input
                type="name"
                className="form-control"
                id="oxygenLevel"
                placeholder="Enter your Oxygen Level"
                onChange={(e) =>
                  setData({ ...data, oxygenLevel: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlFor="heartRate" className="form-label">
                Heart Rate
              </label>
              <input
                type="name"
                className="form-control"
                id="heartRate"
                placeholder="Enter Heart Rate"
                onChange={(e) =>
                  setData({ ...data, heartRate: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlFor="bloodPressure" className="form-label">
                Blood Pressure
              </label>
              <input
                type="name"
                className="form-control"
                id="bloodPressure"
                placeholder="Enter Blood Pressure"
                onChange={(e) =>
                  setData({ ...data, bloodPressure: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Show
              </button>
            </div>
          </form>

          {/* This will show the result of health status */}

          {result && (
            <div className="mt-4">
              <h4>Results:</h4>
              <ul>
                {Object.entries(result).map(([param, status]) => (
                  <li key={param}>
                    {param}: <strong>{status}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* this is the pop up modal section if any of the parameter goes Abnormal */}
          <Modal show={showModal} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Consult a Doctor!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                One or more health parameters are abnormal. Please consult a
                doctor.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HealthStatus;

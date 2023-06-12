import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [category, setCategory] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const bmiCategory = getBMICategory(bmiValue);

    setBMI(bmiValue.toFixed(2));
    setCategory(bmiCategory);
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      return "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25 border">
        <h2>BMI Calculator</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="height">
              <strong>Height (in cm)</strong>
            </label>
            <input
              type="number"
              placeholder="Enter Height"
              value={height}
              className="form-control rounded-0"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="weight">
              <strong>Weight (in kg)</strong>
            </label>
            <input
              type="number"
              placeholder="Enter Weight"
              value={weight}
              className="form-control rounded-0"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={calculateBMI}
              className="btn btn-success w-100 rounded-0"
            >
              Calculate BMI
            </button>
          </div>
        </form>
        <div>
          {bmi && (
            <div>
              <p>Your BMI: {bmi}</p>
              <p>
                Category:{" "}
                <span
                  style={{
                    fontWeight: category === "Overweight" ? "bold" : "normal",
                    color: category === "Overweight" ? "red" : "inherit",
                  }}
                >
                  {category}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;

import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MedicalReport from "./components/MedicalReport";
import LabReport from "./components/LabReport";
import HealthStatus from "./components/HealthStatus";
import StayFitTips from "./components/StayFitTips";
import BMICalculator from "./components/BMICalculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<StayFitTips />}></Route>
          <Route path="/medicalReport" element={<MedicalReport />} />
          <Route path="/labReport" element={<LabReport />} />
          <Route path="/healthStatus" element={<HealthStatus />} />
          <Route path="/bmiCalculator" element={<BMICalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming requests with JSON
app.use(express.json());
// Serve static files from the "public" directory
app.use(express.static("public"));

// Creating Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `http://localhost:2020`,
      },
    ],
  },
  apis: ["index.js"],
};

// This will generate Swagger specification

const swaggerSpec = swaggerJsdoc(swaggerOptions);

//Database connection
const con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "healthcaredb",
});

//Medical report stored in local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    if (file) {
      // Generate a unique filename for the uploaded file
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
    //in case of no file uploaded it will show the error
    else {
      cb(new Error("No file found"), "");
    }
  },
});

const upload = multer({
  storage: storage,
});

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post("/medicalReport", upload.single("image"), (req, res) => {
  console.log(req.body);
  const values = [req.file.filename];
  console.log(values);
  con.query(
    "INSERT INTO PATIENTDATA (image) VALUES (?)",
    values,
    (err, rows) => {
      if (err) return res.json(err);
      return res.json(rows);
    }
  );
});

//to get report from our database

app.get("/showReport", (req, res) => {
  con.query("SELECT * FROM PATIENTDATA", (err, result) => {
    if (err) return res.json(err);
    return res.json({ Status: "Success", Result: result });
  });
});

// It will delete the desired medical report from the History
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM PATIENTDATA WHERE id=?", id, (err, result) => {
    if (err) return res.json(err);
    return res.json({ Status: "Success", Result: result });
  });
});

//It will calculate realtime heath data given by user
app.post("/calculateHealthStatus", (req, res) => {
  const { glucoseLevel, oxygenLevel, heartRate, bloodPressure } = req.body;

  // Normal range or average values for each health parameter
  const normalData = {
    glucoseLevel: { min: 70, max: 100 },
    oxygenLevel: { min: 95, max: 100 },
    heartRate: { min: 60, max: 100 },
    bloodPressure: { min: 90, max: 120 },
  };

  // This will compare user's data with normal data
  const glucoseLevelStatus =
    glucoseLevel >= normalData.glucoseLevel.min &&
    glucoseLevel <= normalData.glucoseLevel.max
      ? "Normal"
      : "Abnormal";

  const oxygenLevelStatus =
    oxygenLevel >= normalData.oxygenLevel.min &&
    oxygenLevel <= normalData.oxygenLevel.max
      ? "Normal"
      : "Abnormal";

  const heartRateStatus =
    heartRate >= normalData.heartRate.min &&
    heartRate <= normalData.heartRate.max
      ? "Normal"
      : "Abnormal";

  const bloodPressureStatus =
    bloodPressure >= normalData.bloodPressure.min &&
    bloodPressure <= normalData.bloodPressure.max
      ? "Normal"
      : "Abnormal";

  // Prepare the results
  const results = {
    glucoseLevel: glucoseLevelStatus,
    oxygenLevel: oxygenLevelStatus,
    heartRate: heartRateStatus,
    bloodPressure: bloodPressureStatus,
  };

  // Sends the result back to the frontend
  res.json(results);
});

// Start the server and listen for incoming requests on port 2020
app.listen(2020, () => {
  console.log("server started at port 2020");
});

/**
 * @swagger
 * /medicalReport:
 *   post:
 *     summary: Upload a medical report
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Medical report uploaded successfully
 */

/**
 * @swagger
 * /showReport:
 *   get:
 *     summary: Get all medical reports
 *     responses:
 *       200:
 *         description: Returns all medical reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: string
 *                   description: Request status
 *                 Result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MedicalReport'
 *
 * /delete/{id}:
 *   delete:
 *     summary: Delete a medical report
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the medical report to delete
 *     responses:
 *       200:
 *         description: Medical report deleted successfully
 */

/**
 * @swagger
 * /calculateHealthStatus:
 *   post:
 *     summary: Calculate health status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthStatusRequest'
 *     responses:
 *       200:
 *         description: Health status calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatusResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalReport:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Medical report ID
 *         image:
 *           type: string
 *           description: Medical report image filename
 *
 *     HealthStatusRequest:
 *       type: object
 *       properties:
 *         glucoseLevel:
 *           type: string
 *           description: User's glucose level
 *         oxygenLevel:
 *           type: string
 *           description: User's oxygen level
 *         heartRate:
 *           type: string
 *           description: User's heart rate
 *         bloodPressure:
 *           type: string
 *           description: User's blood pressure
 *
 *     HealthStatusResponse:
 *       type: object
 *       properties:
 *         glucoseLevel:
 *           type: string
 *           description: Status of the user's glucose level
 *         oxygenLevel:
 *           type: string
 *           description: Status of the user's oxygen level
 *         heartRate:
 *           type: string
 *           description: Status of the user's heart rate
 *         bloodPressure:
 *           type: string
 *           description: Status of the user's blood pressure
 */

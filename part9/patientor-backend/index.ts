import express from "express";
import cors from "cors";
import diagnosesRouter from "./src/routes/diagnoses";
import patientRouter from "./src/routes/patients";
const app = express();
app.use(express.json())
app.use(cors())

const PORT = 3000;

app.get("/api/ping", (req, res) => {
    res.json("pong");
});


app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter)

app.listen(PORT, () => {
    console.log(`Serevr running on port ${PORT}`)
})
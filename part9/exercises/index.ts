import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json())
app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack")
})

app.post("/exercises", (req, res) => {
    const {info, target} = req.body;
    if (!Array.isArray(info) || info.some((value) => isNaN(Number(value)))) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    if (isNaN(Number(target))) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    const result = calculateExercises(info, Number(target))
    return res.json({result})
})


app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)){
        res.status(400).json({error: "malformatted parameters"})
        return;
    }
    const result = bmiCalculator(weight, height)
    res.json({
        "weight": weight,
        "height": height,
        "bmi": result
    })
})

const PORT = 4000;

app.listen(PORT ,() => {
    console.log(`Server is running on ${PORT}`)
})

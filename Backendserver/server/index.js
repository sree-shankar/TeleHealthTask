const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let appointments = [
    {
        id: 1,
        doctor: "Dr. Sarah Johnson",
        date: "2025-07-22",
        time: "10:00",
        type: "Video Call",
        status: "Upcoming",
        reason: "Annual Physical Examination",
    },
    {
        id: 2,
        doctor: "Dr. Michael Chen",
        date: "2025-07-25",
        time: "14:00",
        type: "In-person",
        status: "Upcoming",
        reason: "Follow-up on blood pressure",
    },
];

const prescriptions = [
    {
        id: 1,
        name: "Albuterol Inhaler",
        dosage: "90mcg",
        frequency: "As needed",
        startDate: "1/1/2024",
        endDate: "12/31/2024",
        doctor: "Dr. Sarah Johnson",
        instructions: "2 puffs every 4-6 hours as needed for asthma",
        refillsLeft: 3,
    },
    {
        id: 2,
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "1/1/2024",
        endDate: "12/31/2024",
        doctor: "Dr. Michael Chen",
        instructions: "Take with food in the morning",
        refillsLeft: 5,
    },
];

// GET
app.get("/api/appointments", (req, res) => res.json(appointments));
app.get("/api/prescriptions", (req, res) => res.json(prescriptions));

// POST new appointment
app.post("/api/appointments", (req, res) => {
    const newAppt = {
        id: appointments.length + 1,
        status: "Upcoming",
        ...req.body,
    };
    appointments.push(newAppt);
    res.status(201).json(newAppt);
});

app.listen(PORT, () =>
    console.log(`✅ Backend running at http://localhost:${PORT}`)
);

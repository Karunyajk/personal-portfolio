require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const Contact = mongoose.model("Contact", {
    name: String,
    email: String,
    message: String
});

app.get("/api/message", (req, res) => {
    res.json({
        message: "Backend is working successfully!"
    });
});

app.post("/api/contact", async (req, res) => {
    try {
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        await contact.save();

        res.json({
            message: "Message saved successfully!"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to save message"
        });
    }
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });
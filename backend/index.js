const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (include the correct database name in the URL)
mongoose.connect('mongodb+srv://User1:123@cluster0.9vji8.mongodb.net/attendance_db', {  // Specify "attendance_db" here
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully"); // Success message
})
.catch(err => {
    console.error("MongoDB connection error: ", err); // Error message
});

// Define a schema for attendance records
const attendanceSchema = new mongoose.Schema({
    name: String,
    attendance: Number,
    days: Number,
});

// Create a model from the schema, specifying the collection name explicitly
const Attendance = mongoose.model('Attendance', attendanceSchema, 'students_attendance');

// Endpoint to retrieve attendance data
app.get('/api/attendance', async (req, res) => {
    try {
        const attendanceData = await Attendance.find(); // Retrieve all attendance records
        res.json(attendanceData); // Send data as JSON
        console.log("Retrieved data:", attendanceData); // Log the retrieved data for debugging
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

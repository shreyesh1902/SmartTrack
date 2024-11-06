// src/components/Attendance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance');
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching attendance data: ", error);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div>
      <h1>Student Attendance</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attendance Percentage</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.attendance}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;

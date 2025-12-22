import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AttendanceManagement = () => {
    const { userData } = useSelector((state) => state);
    const faculty = userData;
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [attendanceData, setAttendanceData] = useState({});
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        fetchSubjects();
        fetchPendingRequests();
    }, [faculty]);

    const fetchSubjects = async () => {
        try {
            if (faculty) {
                const response = await axios.get(`${process.env.REACT_APP_APILINK}/subject/getSubject`);
                setSubjects(response.data.subject);
                console.log(response.data)
            } else {
                toast.error('Faculty ID not found');
            }
        } catch (error) {
            toast.error('Error fetching subjects');
        }
    };

    const fetchStudents = async (subjectId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_APILINK}/student/details/subject/${subjectId}`);
            setStudents(response.data.students);
            console.log(response.data)
        } catch (error) {
            toast.error('Error fetching students');
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_APILINK}/attendance/requests`);
            setPendingRequests(response.data.data);
        } catch (error) {
            toast.error('Error fetching pending requests');
        }
    };

    const handleSubjectChange = (e) => {
        const subjectId = e.target.value;
        setSelectedSubject(subjectId);
        fetchStudents(subjectId);
    };

    const handleAttendanceChange = (studentId, status) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmitAttendance = async () => {
        try {
            const promises = Object.entries(attendanceData).map(([studentId, status]) => {
                return axios.post(`${process.env.REACT_APP_APILINK}/attendance/add`, {
                    student: studentId,
                    subject: selectedSubject,
                    date: selectedDate,
                    status
                }, {
                    headers: { 'Authorization': `Bearer ${faculty.token}` }
                });
            });

            await Promise.all(promises);
            toast.success('Attendance marked successfully');
            setAttendanceData({});
        } catch (error) {
            toast.error('Error marking attendance');
        }
    };

    const handleAttendanceRequest = async (requestId, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_APILINK}/attendance/request/${requestId}`, 
                { status },
                { headers: { 'Authorization': `Bearer ${faculty.token}` } }
            );
            toast.success('Request handled successfully');
            fetchPendingRequests();
        } catch (error) {
            toast.error('Error handling request');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Attendance Management</h2>
            
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Mark Attendance</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                    <select
                        className="border p-2 rounded"
                        onChange={handleSubjectChange}
                        value={selectedSubject}
                    >
                        <option value="">Select Subject</option>
                        {subjects?.map(subject => (
                            <option key={subject._id} value={subject._id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                {students.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Roll No</th>
                                    <th className="px-4 py-2">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student._id}>
                                        <td className="border px-4 py-2">{student.name}</td>
                                        <td className="border px-4 py-2">{student.rollNo}</td>
                                        <td className="border px-4 py-2">
                                            <select
                                                className="border p-1 rounded"
                                                value={attendanceData[student._id] || ''}
                                                onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="present">Present</option>
                                                <option value="absent">Absent</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleSubmitAttendance}
                        >
                            Submit Attendance
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Pending Attendance Requests</h3>
                {pendingRequests.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Student</th>
                                    <th className="px-4 py-2">Subject</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Message</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map(request => (
                                    <tr key={request._id}>
                                        <td className="border px-4 py-2">{request.student.name}</td>
                                        <td className="border px-4 py-2">{request.subject.name}</td>
                                        <td className="border px-4 py-2">
                                            {new Date(request.date).toLocaleDateString()}
                                        </td>
                                        <td className="border px-4 py-2">{request.requestMessage}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                onClick={() => handleAttendanceRequest(request._id, 'approved')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() => handleAttendanceRequest(request._id, 'rejected')}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No pending requests</p>
                )}
            </div>
        </div>
    );
};

export default AttendanceManagement; 
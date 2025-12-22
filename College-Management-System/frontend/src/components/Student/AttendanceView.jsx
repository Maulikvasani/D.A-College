import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AttendanceView = () => {
    const userData = useSelector((state) => state.userData);
    const student = userData;
    const [attendance, setAttendance] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [requestMessage, setRequestMessage] = useState('');
    const [selectedAttendance, setSelectedAttendance] = useState(null);

    useEffect(() => {
        fetchAttendance();
        fetchSubjects();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/attendance/student/${userData.enrollmentNo}`,
                
            );
            setAttendance(response.data);
        } catch (error) {
            toast.error('Error fetching attendance');
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/subject/getSubject`,
                
            );
            setSubjects(response.data.subject);
        } catch (error) {
            toast.error('Error fetching subjects');
        }
    };

    const handleRequestChange = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/attendance/request`,
                {
                    attendanceId: selectedAttendance._id,
                    message: requestMessage
                },
                    
            );
            toast.success('Attendance change request submitted');
            setRequestMessage('');
            setSelectedAttendance(null);
            fetchAttendance();
        } catch (error) {
            toast.error('Error submitting request');
        }
    };

    const filteredAttendance = selectedSubject === 'all'
        ? attendance
        : attendance.filter(a => a.subject._id === selectedSubject);

    const calculateAttendancePercentage = (subjectId) => {
        const subjectAttendance = attendance.filter(a => a.subject._id === subjectId);
        const totalClasses = subjectAttendance.length;
        const presentClasses = subjectAttendance.filter(a => a.status === 'present').length;
        return totalClasses === 0 ? 0 : ((presentClasses / totalClasses) * 100).toFixed(2);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Attendance</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Attendance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjects?.map(subject => (
                        <div key={subject._id} className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-semibold">{subject.name}</h4>
                            <p className="text-lg">
                                {calculateAttendancePercentage(subject._id)}% Present
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <select
                    className="border p-2 rounded"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    <option value="all">All Subjects</option>
                    {subjects?.map(subject => (
                        <option key={subject._id} value={subject._id}>
                            {subject.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Subject</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Request Status</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance?.map(record => (
                            <tr key={record._id}>
                                <td className="border px-4 py-2">
                                    {new Date(record.date).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2">{record.subject.name}</td>
                                <td className="border px-4 py-2">
                                    <span className={`px-2 py-1 rounded ${
                                        record.status === 'present' ? 'bg-green-200' : 'bg-red-200'
                                    }`}>
                                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">
                                    {record.requestStatus !== 'none' && (
                                        <span className={`px-2 py-1 rounded ${
                                            record.requestStatus === 'approved' ? 'bg-green-200' :
                                            record.requestStatus === 'rejected' ? 'bg-red-200' :
                                            'bg-yellow-200'
                                        }`}>
                                            {record.requestStatus.charAt(0).toUpperCase() + record.requestStatus.slice(1)}
                                        </span>
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {record.status === 'absent' && record.requestStatus === 'none' && (
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                            onClick={() => setSelectedAttendance(record)}
                                        >
                                            Request Change
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedAttendance && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-2">Request Attendance Change</h3>
                        <textarea
                            className="w-full border p-2 rounded mb-4"
                            rows="4"
                            placeholder="Enter your reason for requesting change..."
                            value={requestMessage}
                            onChange={(e) => setRequestMessage(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setSelectedAttendance(null);
                                    setRequestMessage('');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleRequestChange}
                                disabled={!requestMessage.trim()}
                            >
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceView; 
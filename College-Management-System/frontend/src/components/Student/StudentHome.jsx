import React from 'react';
import { useSelector } from 'react-redux';

const StudentHome = () => {
    const { student } = useSelector((state) => state.student);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome, {student?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-4">
                        <a href="/student/attendance" className="block p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                            <i className="fa-solid fa-clipboard-user mr-2"></i>
                            View Attendance
                        </a>
                        <a href="/student/marks" className="block p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                            <i className="fa-solid fa-square-poll-vertical mr-2"></i>
                            View Marks
                        </a>
                        <a href="/student/materials" className="block p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                            <i className="fa-solid fa-file mr-2"></i>
                            Access Materials
                        </a>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <p className="text-gray-600">No recent activity</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                    <p className="text-gray-600">No new notifications</p>
                </div>
            </div>
        </div>
    );
};

export default StudentHome; 
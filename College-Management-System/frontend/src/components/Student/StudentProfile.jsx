import React from 'react';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
    const { student } = useSelector((state) => state.student);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm">Name</label>
                                <p className="font-medium">{student?.name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Email</label>
                                <p className="font-medium">{student?.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Roll Number</label>
                                <p className="font-medium">{student?.rollNo}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Date of Birth</label>
                                <p className="font-medium">
                                    {student?.dob 
                                        ? new Date(student.dob).toLocaleDateString()
                                        : 'Not specified'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm">Branch</label>
                                <p className="font-medium">{student?.branch?.name || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Semester</label>
                                <p className="font-medium">{student?.semester || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Section</label>
                                <p className="font-medium">{student?.section || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Batch</label>
                                <p className="font-medium">{student?.batch || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile; 
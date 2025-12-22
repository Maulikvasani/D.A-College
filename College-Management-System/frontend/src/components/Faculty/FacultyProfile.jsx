import React from 'react';
import { useSelector } from 'react-redux';

const FacultyProfile = () => {
    const { faculty } = useSelector((state) => state.faculty);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Faculty Profile</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm">Name</label>
                                <p className="font-medium">{faculty?.name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Email</label>
                                <p className="font-medium">{faculty?.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Department</label>
                                <p className="font-medium">{faculty?.department}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Faculty ID</label>
                                <p className="font-medium">{faculty?.facultyId}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm">Designation</label>
                                <p className="font-medium">{faculty?.designation || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Joining Date</label>
                                <p className="font-medium">
                                    {faculty?.joiningDate 
                                        ? new Date(faculty.joiningDate).toLocaleDateString()
                                        : 'Not specified'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm">Specialization</label>
                                <p className="font-medium">{faculty?.specialization || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyProfile; 
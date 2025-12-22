import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FacultyNavbar = () => {
    const location = useLocation();
    const { faculty } = useSelector((state) => state.faculty);

    const navigation = [
        {
            name: "Home",
            link: "/faculty/home",
            icon: "fa-solid fa-house"
        },
        {
            name: "Profile",
            link: "/faculty/profile",
            icon: "fa-solid fa-user"
        },
        {
            name: "Students",
            link: "/faculty/students",
            icon: "fa-solid fa-users"
        },
        {
            name: "Subjects",
            link: "/faculty/subjects",
            icon: "fa-solid fa-book"
        },
        {
            name: "Materials",
            link: "/faculty/materials",
            icon: "fa-solid fa-file"
        },
        {
            name: "Attendance",
            link: "/faculty/attendance",
            icon: "fa-solid fa-clipboard-user"
        },
        {
            name: "Marks",
            link: "/faculty/marks",
            icon: "fa-solid fa-square-poll-vertical"
        },
        {
            name: "Notices",
            link: "/faculty/notices",
            icon: "fa-solid fa-bell"
        }
    ];

    return (
        <div className="h-screen bg-white shadow-lg">
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-20 shadow-md">
                    <h1 className="text-xl font-bold">Faculty Dashboard</h1>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="p-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.link}
                                className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${
                                    location.pathname === item.link
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <i className={`${item.icon} w-6`}></i>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="p-4 border-t">
                    <div className="flex items-center mb-4">
                        <div className="ml-3">
                            <p className="font-medium">{faculty?.name}</p>
                            <p className="text-sm text-gray-500">{faculty?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyNavbar; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const URL = 'https://648fd31e1e6aa71680ca2055.mockapi.io/staffManagement';

const Dashboard = () => {

    const [staffs, setStaffs] = useState([]);

    const getListStaff = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setStaffs(res.data);
        }
    }

    useEffect(() => {
        getListStaff();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure that you want to delete a staff with ID: ${id}`)) {
            const res = await axios.delete(`${URL}/${id}`);
            if (res.status === 200) {
                getListStaff();
                toast.success("Deleted Successfully");
            } else {
                toast.error("Deleted Error!");
            }
        }
    }

    return (
        <div className="staff-table">
            <div className="btn-add">
                <Link to={"/add/"}>
                    <button className="add-staff-btn">Add new staff</button>
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {staffs && staffs.map(staff => (
                        <tr key={staff.id}>
                            <td>{staff.id}</td>
                            <td>{staff.name}</td>
                            <td><img src={staff.avatar} alt={staff.id} /></td>
                            <td>{staff.age}</td>
                            <td>{staff.address}</td>
                            <td>{new Date(staff.createdAt * 1000).toLocaleDateString()}</td>                            <td>
                                <Link to={`/update/${staff.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(staff.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;
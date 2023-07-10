import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/formAddEdit.css";

const URL = 'https://648fd31e1e6aa71680ca2055.mockapi.io/staffManagement';

const initialSate = {
    name: '',
    avatar: '',
    age: '',
    address: '',
    createdAt: Math.floor(Date.now() / 1000)
}

const error_init = {
    name_error: '',
    avatar_error: '',
    age_error: '',
    address_error: '',
}

const FormAddEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState(initialSate);
    const { name, avatar, age, address } = state;
    const [errors, setErrors] = useState(error_init);

    const getOneStaff = async (id) => {
        const res = await axios.get(`${URL}/${id}`);
        if (res.status === 200) {
            setState(res.data);
        }
    }

    useEffect(() => {
        if (id) getOneStaff(id);
    }, [id]);

    const updateStaff = async (staffID, data) => {
        const res = await axios.put(`${URL}/${staffID}`, data);
        if (res.status === 200) {
            toast.success(`Updated Staff with ID: ${staffID} successfully`);
            navigate("/dashboard");
        }
    }

    const addNewStaff = async (data) => {
        const res = await axios.post(`${URL}`, data);
        if (res.status === 200 || res.status === 201) {
            toast.success("New staff has been added successfully");
            navigate("/dashboard");
        }
    }

    //validate
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (name.trim() === '' || name.length < 2) {
            errors.name_error = "Name is required";
            if (name.length < 2) {
                errors.name_error = "Name must be more than 2 words";
            }
            isValid = false;
        }

        if (avatar.trim() === '') {
            errors.avatar_error = "Avatar is required";
            isValid = false;
        }

        if (isNaN(age) || parseInt(age) < 1 || age === null) {
            errors.age_error = "Age must be a positive number and more than 0";
            isValid = false;
        }

        if (address.trim() === '') {
            errors.address_error = "Address is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (id) updateStaff(id, state);
            else addNewStaff(state);
        } else {
            toast.error("Some info is invalid ~ Pls check again");
        }
    }

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    }

    return (
        <div className="container">
            <div className="form">
                <h2>{id ? "Update Form" : "Add New Staff"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" value={state.name}
                            onChange={handleInputChange} />
                        {errors.name_error && <span className="error">{errors.name_error}</span>}
                    </div>

                    <div>
                        <label htmlFor="avatar">Avatar: </label>
                        <input type="text" name="avatar" value={state.avatar}
                            onChange={handleInputChange} />
                        {errors.avatar_error && <span className="error">{errors.avatar_error}</span>}
                    </div>

                    <div>
                        <label htmlFor="age">Age: </label>
                        <input type="number" name="age" value={state.age} onChange={handleInputChange} />
                        {errors.age_error && <span className="error">{errors.age_error}</span>}
                    </div>

                    <div>
                        <label htmlFor="address">Address: </label>
                        <input type="text" name="address" value={state.address} onChange={handleInputChange} />
                        {errors.address_error && <span className="error">{errors.address_error}</span>}
                    </div>

                    {id && (
                        <div>
                            <label htmlFor="createdAt">Created At: </label>
                            <input type="text" name='createdAt' value={new Date(state.createdAt * 1000).toLocaleDateString()} readOnly />
                            {errors.address_error && <span className="error">{errors.address_error}</span>}
                        </div>
                    )}

                    <button type="submit" className="form-button">{id ? "Update" : "Submit"}</button>
                </form>
            </div>

        </div>
    )
}

export default FormAddEdit;
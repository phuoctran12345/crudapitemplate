import React, { useState, useEffect } from "react";

function UserForm({ initialData, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: 16 }}>
            <div>
                <label>Email: </label>
                <input name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
                <label>First name: </label>
                <input name="first_name" value={form.first_name} onChange={handleChange} required />
            </div>
            <div>
                <label>Last name: </label>
                <input name="last_name" value={form.last_name} onChange={handleChange} required />
            </div>
            <div>
                <label>Avatar URL: </label>
                <input name="avatar" value={form.avatar} onChange={handleChange} required />
            </div>
            <button type="submit">Lưu</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Huỷ</button>
        </form>
    );
}

export default UserForm;
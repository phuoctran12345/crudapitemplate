import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, createUser, deleteUser } from "../api/users";
import UserForm from "./UserForm";
import "./ListUser.css";

function ListUser() {
    const [listUsers, setListUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await getAllUsers();
            setListUsers(users);
        } catch (error) {
            alert("Lỗi khi lấy danh sách user");
        }
    };

    const handleViewDetailUser = (user) => {
        navigate(`/user/${user.id}`);
    };

    const handleAddUser = async (userData) => {
        try {
            await createUser(userData);
            setShowForm(false);
            fetchUsers();
        } catch (error) {
            alert("Lỗi khi thêm user");
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa user này?")) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                alert("Lỗi khi xóa user");
            }
        }
    };

    return (
        <div className="list-user-container">
            <div className="title">Fetch all list users</div>
            <button onClick={() => setShowForm(true)}>Thêm user</button>
            {showForm && (
                <UserForm
                    onSubmit={handleAddUser}
                    onCancel={() => setShowForm(false)}
                />
            )}
            <div className="list-user-content">
                {listUsers.map((item, index) => (
                    <div className="child" key={item.id}>
            <span onClick={() => handleViewDetailUser(item)} style={{ cursor: "pointer" }}>
              {index + 1} - {item.first_name} {item.last_name}
            </span>
                        <button style={{ marginLeft: 8 }} onClick={() => handleDeleteUser(item.id)}>
                            Xóa
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListUser;
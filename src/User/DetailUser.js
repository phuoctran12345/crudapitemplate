import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../api/users";
import UserForm from "./UserForm";

function DetailUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch (error) {
                alert("Lỗi khi lấy chi tiết user");
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser(id, userData);
            setEditMode(false);
            setUser(userData);
            alert("Cập nhật thành công!");
        } catch (error) {
            alert("Lỗi khi cập nhật user");
        }
    };

    if (!user) return <div>Đang tải...</div>;

    return (
        <>
            <div>hello world from detail user with id: {id}</div>
            {editMode ? (
                <UserForm
                    initialData={user}
                    onSubmit={handleUpdateUser}
                    onCancel={() => setEditMode(false)}
                />
            ) : (
                <>
                    <div>User's name: {user.first_name} - {user.last_name}</div>
                    <div>User's email: {user.email}</div>
                    <div>
                        <img src={user.avatar} alt="avatar" />
                    </div>
                    <div>
                        <button type="button" onClick={() => navigate("/user")}>Back</button>
                        <button type="button" onClick={() => setEditMode(true)} style={{ marginLeft: 8 }}>Sửa</button>
                    </div>
                </>
            )}
        </>
    );
}

export default DetailUser;
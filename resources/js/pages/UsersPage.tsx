import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async ()  => {
            try {
                const response = await axios.get<User[]>("/api/users");
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch users");
                setLoading(false);
            }
        }

        fetchUsers();

    }, []);

    if(loading) {
        return <p>Loading Users...</p>
    }

    if(error) {
        return <p className="text-center text-gray-500">{error}</p>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li 
                        key={user.id}
                        className="p-2 border rounded shadow-sm">
                            <p className="font-semibold">{user.name}</p>
                            <p className="font-semibold">{user.email}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default UsersPage;
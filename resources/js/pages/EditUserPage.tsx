import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

interface User {
  id: number;
  name?: string;
  email?: string;
  roles?: string[];
}

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (data: { name: string; email: string; roles: string[] }) => {
    await axios.put(`/api/users/${id}`, data);
    history.push("/users");
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading User...</p>;
  }

  if (error || !user) {
    return <p className="text-center text-red-500">{error || "User not found"}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() => history.push("/users")}
        >
          Back to Users
        </button>
      </div>
      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        onCancel={() => history.push("/users")}
        isEdit
      />
    </div>
  );
};

export default EditUserPage;
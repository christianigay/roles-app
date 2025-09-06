import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserForm from "../components/user/UserForm";

const UserAddPage: React.FC = () => {
  const history = useHistory();

  const handleSubmit = async (data: { name: string; email: string; roles: number[] }) => {
    await axios.post("/api/users/add", data);
    history.push("/users");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add New User</h1>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() => history.push("/users")}
        >
          Back to Users
        </button>
      </div>
      <UserForm onSubmit={handleSubmit} onCancel={() => history.push("/users")} />
    </div>
  );
};

export default UserAddPage;
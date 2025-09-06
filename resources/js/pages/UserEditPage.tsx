import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import UserForm from "../components/user/UserForm";
import { _catchErrors } from "../utils/errorHandler";
import { UserData } from "../components/user/types/UserData";

interface RouteParams {
  id: string;
}

const UserEditPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}/details`);
        const data = response.data;
        const roles = data.roles.map((r: any) => r.id);
        setUserData({ ...data, roles });
      } catch (err: any) {
        _catchErrors(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (data: UserData) => {
    try {
      await axios.post(`/api/users/${id}/update`, data);
      history.push("/users");
    } catch (err: any) {
      _catchErrors(err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading user...</div>;
  if (!userData) return <div className="text-center p-4">User not found</div>;

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
        initialData={userData}
        onSubmit={handleSubmit}
        onCancel={() => history.push("/users")}
        isEdit
      />
    </div>
  );
};

export default UserEditPage;

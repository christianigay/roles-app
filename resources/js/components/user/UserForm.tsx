import React, { useState, useEffect } from "react";
import { _catchErrors } from "../../utils/errorHandler";
import axios from "axios";

interface UserFormProps {
  initialData?: {
    id?: number;
    name?: string;
    email?: string;
    roles?: number[];
  };
  onSubmit: (data: { name: string; email: string; roles: number[] }) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

interface Role {
  id: number;
  name: string;
}

const UserForm: React.FC<UserFormProps> = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    roles: initialData.roles || [],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);


  useEffect(() => {
    const fetchRoles = async() => {
      try {
        const response = await axios.get('/api/roles');
        setAvailableRoles(response.data.data || []);
      } catch (err: any) {
        _catchErrors(err);
      }
    }

    fetchRoles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    setFormData((prev) => ({ ...prev, roles: selected }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err: any) {
			_catchErrors(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
          Roles
        </label>
        <select
          id="roles"
          name="roles"
          multiple
          value={formData.roles.map(String)}
          onChange={handleRoleChange}
          className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {availableRoles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple roles</p>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
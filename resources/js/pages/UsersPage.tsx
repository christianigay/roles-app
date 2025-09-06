import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DataTable from "../components/DataTable";

interface User {
  id: number;
  name?: string;
  email?: string;
  title?: string;
  [key: string]: any;
}

const UsersPage: React.FC = () => {
	const history = useHistory();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
	const [totalItems, setTotalItems] = useState(0);
	useEffect(() => {
		const fetchUsers = async ()  => {
			try {
				const response = await axios.get<{
					data: User[];
					total: number;
					per_page: number;
					current_page: number;
				}>("/api/users", {
					params: {
						page,
						per_page: itemsPerPage,
					},
				});

				setUsers(response.data.data || []);
				setTotalItems(response.data.total || 0);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch users");
				setLoading(false);
			}
		}

		fetchUsers();

	}, [page, itemsPerPage]);

	const handleAddUser = () => {
    history.push("/user/add");
  };

	const handleEditItem = (item: User) => {
		history.push(`/user/edit/${item.id}`);
	};

	const handleDeleteItem = (item: User) => {
		
	};

	const tableData = {
		headers: [
      { key: "id", title: "ID", sortable: true },
      { key: "name", title: "Name", sortable: true },
      { key: "email", title: "Email", sortable: true },
      { key: "roles", title: "Roles", sortable: true },
      { key: "actions", title: "Actions", sortable: false },
    ],
		tableItems: users,
	};


	if(loading) {
		return <p className="text-center text-gray-500">Loading Users...</p>;
	}

	if(error) {
		return <p className="text-center text-red-500">{error}</p>;
	}

	

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
			<DataTable
				tableData={tableData}
				onEditItem={handleEditItem}
				onDeleteItem={handleDeleteItem}
				renderColumn={(key, item) => {
					if (key === "email") {
						return <a href={`mailto:${item.email}`} className="text-blue-600">{item.email}</a>;
					}

					if (key === "roles") {
						return <div>{item.display_roles}</div>
					}
					return item[key];
				}}
			/>
		</div>
	)
}

export default UsersPage;
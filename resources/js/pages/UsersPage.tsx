import React, { useEffect, useState } from "react";
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

	}, []);

	const handleEditItem = (item: User) => {
		console.log("Edit user:", item);
	};

	const handleDeleteItem = (item: User) => {
		console.log("Delete user:", item);
		// Implement delete logic (e.g., confirm dialog, API call)
	};

	const tableData = {
		headers: [
      { key: "id", title: "ID", sortable: true },
      { key: "name", title: "Name", sortable: true },
      { key: "email", title: "Email", sortable: true },
      { key: "created_at", title: "Created At", sortable: true },
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
			<h1 className="text-2xl font-bold mb-4">Users</h1>
			<DataTable
				tableData={tableData}
				onEditItem={handleEditItem}
				onDeleteItem={handleDeleteItem}
				renderColumn={(key, item) => {
					if (key === "email") {
							return <a href={`mailto:${item.email}`} className="text-blue-600">{item.email}</a>;
					}
					return item[key];
				}}
			/>
		</div>
	)
}

export default UsersPage;
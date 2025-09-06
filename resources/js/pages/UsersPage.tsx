import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DataTable from "../components/DataTable";
import { RoleData } from "../components/user/types/RoleData";

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
	const [roles, setRoles] = useState<RoleData[]>([]);
	const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

	useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<{ data: RoleData[] }>("/api/roles");
				setRoles(response.data.data || []); 
      } catch (err) {
        console.error("Failed to fetch roles", err);
      }
    };
    fetchRoles();
  }, []);

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
						roles: selectedRoles.join(","),
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

	}, [page, itemsPerPage, selectedRoles]);

	const handleAddUser = () => {
		history.push("/user/add");
	};

	const handleEditItem = (item: User) => {
		history.push(`/user/edit/${item.id}`);
	};

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setSelectedRoles(selected);
    setPage(1);
  };

	const tableData = {
		headers: [
      { key: "id", title: "ID"},
      { key: "name", title: "Name"},
      { key: "email", title: "Email"},
      { key: "roles", title: "Roles"},
      { key: "actions", title: "Actions"},
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
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
				<h1 className="text-2xl font-bold">Users</h1>

				<div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
					{/* Roles Filter */}
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Filter by Roles
						</label>
					<div>
						<div className="flex flex-wrap gap-2">
							{roles.map((role) => {
								const isSelected = selectedRoles.includes(role.id);
								return (
									<button
										key={role.id}
										onClick={() => {
											setSelectedRoles((prev) =>
												prev.includes(role.id)
													? prev.filter((r) => r !== role.id) // remove if selected
													: [...prev, role.id] // add if not selected
											);
										}}
										className={`px-3 py-1 rounded-md text-sm border transition ${
											isSelected
												? "bg-blue-600 text-white border-blue-600"
												: "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
										}`}
									>
										{role.name}
									</button>
								);
							})}
						</div>
					</div>

					{/* Add User Button */}
					<button
						className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 self-start"
						onClick={handleAddUser}
					>
						Add User
					</button>
				</div>
			</div>

			<DataTable
				tableData={tableData}
				onEditItem={handleEditItem}
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
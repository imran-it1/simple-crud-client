import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
	const loadedUsers = useLoaderData();
	const [users, setUsers] = useState(loadedUsers);

	const handleDelete = _id => {
		console.log("delete", _id);

		// Delete operation
		fetch(`http://localhost:5000/users/${_id}`, {
			method: "DELETE",
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.deletedCount > 0) {
					//jeta ke delete korci seta bade baki gulo ke dao
					alert("user delete successful");
					const remainingUsers = users?.filter(user => user._id !== _id);
					// Baki gulo ke state set kore dile, component ta abar rerender hobe, notun data se UI te dekhabe
					setUsers(remainingUsers);
				}
			});
	};

	return (
		<div>
			<h1>{users.length}</h1>

			<div>
				{users?.map(user => (
					<p key={user._id}>
						{user.name} : {user.email} : {user._id}
						<button onClick={() => handleDelete(user._id)}>Delete</button>
					</p>
				))}
			</div>
		</div>
	);
};

export default Users;

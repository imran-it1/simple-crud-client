import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const Update = () => {
	const loadedUser = useLoaderData();
	console.log(loadedUser);

	//  Get the value what user want to update

	const handleUpdate = event => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const user = { name, email };

		console.log(name, email);

		fetch(`http://localhost:5000/users/${loadedUser._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.modifiedCount > 0) {
					alert("User update successful");
				}
			});
	};

	return (
		<div>
			<p>Update user info: {loadedUser.name} </p>

			<form onSubmit={handleUpdate}>
				<input type="text" name="name" defaultValue={loadedUser.name} id="" />
				<br />
				<input
					type="email"
					name="email"
					defaultValue={loadedUser.email}
					id="user-email"
				/>
				<br />
				<input type="submit" value="Update" />
			</form>
		</div>
	);
};

export default Update;

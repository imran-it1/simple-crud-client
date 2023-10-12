import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
	const handleAddUser = event => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const name = form.get("name");
		const email = form.get("email");
		const user = { name, email };

		// Now fetch and hit the POST api in the server side
		fetch("http://localhost:5000/users", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.insertedId) {
					toast.success("User save to database successful");
					event.target.reset();
				}
			});
	};

	return (
		<>
			<h2>Simple CRUD Operation</h2>
			<form onSubmit={handleAddUser}>
				<input type="text" name="name" id="" />
				<br />
				<input type="email" name="email" id="" />
				<br />
				<input type="submit" value="Add User" />
			</form>

			<Toaster />
		</>
	);
}

export default App;

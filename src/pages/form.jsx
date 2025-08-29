import React, { useState } from "react";
import "./form.css";

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {       
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		// You can add API call here
	};

	return (
		<div className="form">
			<h2>Create An Account</h2>
			<p> Join us to get started with your probate application</p>
			<form onSubmit={handleSubmit}>
				<label>Full Name</label>
				<input
					type="text"
					name="name"
					placeholder="Enter Your Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<label>Email Address</label>
				<input
					type="email"
					name=" email"
					placeholder="Enter Your Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<label>Password</label>
				<input
					type="password"
					name="password"
					placeholder="Enter Your Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<label>Confirm Password</label>
                <input
					type="confirm-password"
					name="confirm-password"
					placeholder="Confirm Password"
					value={formData["confirm-password"]}
					onChange={handleChange}
					required
				/>
				<button type="submit">Create an Account</button>
			</form>
			{submitted && <p>Sign up successful!</p>}
		</div>
	);
};

export default SignUpForm;
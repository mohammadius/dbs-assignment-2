import type { FunctionComponent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Gender, User } from "models";
import Head from "next/head";

const Users: FunctionComponent = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);

	const submitUser = async (event) => {
		event.preventDefault();
		setSubmitting(true);

		const res = await fetch("/api/users", {
			body: JSON.stringify({
				firstName: event.target.firstName.value,
				lastName: event.target.lastName.value,
				email: event.target.email.value,
				birthDate: event.target.birthDate.value,
				phoneNumber: event.target.phoneNumber.value,
				gender: event.target.gender.value,
				address: event.target.address.value
			}),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		});

		setSubmitting(false);

		if (res.ok) {
			const newUser = (await res.json()) as User;
			router.push("/users/" + newUser.id);
		}
	};

	return (
		<main className='flex flex-col items-center w-full flex-1 px-20'>
			<Head>
				<title>Add User</title>
			</Head>
			<h1 className='text-xl font-bold'>Add User</h1>
			<form className='mt-4 w-full max-w-lg' onSubmit={submitUser}>
				<div className='flex flex-col gap-6'>
					<label className='block'>
						<span className='text-gray-700'>First name</span>
						<input
							type='text'
							name='firstName'
							required
							className='py-2 px-3 mt-1
							w-full
							rounded-md
							border
							border-gray-300
							shadow-sm
							focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						/>
					</label>
					<label className='block'>
						<span className='text-gray-700'>Last name</span>
						<input
							type='text'
							name='lastName'
							required
							className='py-2 px-3 mt-1
							w-full
							rounded-md
							border
							border-gray-300
							shadow-sm
							focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						/>
					</label>
					<label className='block'>
						<span className='text-gray-700'>Email</span>
						<input
							type='email'
							name='email'
							required
							className='py-2 px-3 mt-1
							w-full
							rounded-md
							border
							border-gray-300
							shadow-sm
							focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						/>
					</label>
					<label className='block'>
						<span className='text-gray-700'>Birth Date</span>
						<input
							type='date'
							name='birthDate'
							required
							className='py-2 px-3 mt-1
							w-full
							rounded-md
							border
							border-gray-300
							shadow-sm
							focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
							placeholder='1997-11-21'
						/>
					</label>
					<label className='block'>
						<span className='text-gray-700'>Phone number</span>
						<input
							type='tel'
							name='phoneNumber'
							required
							className='py-2 px-3 mt-1
							w-full
							rounded-md
							border
							border-gray-300
							shadow-sm
							focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						/>
					</label>
					<label className='block'>
						<span className='text-gray-700'>Gender</span>
						<select
							name='gender'
							required
							className='py-2 px-3 mt-1
							w-full
							rounded-md
							border
							border-gray-300
							shadow-sm
							focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'>
							<option value={Gender.Male}>Male</option>
							<option value={Gender.Female}>Female</option>
						</select>
					</label>
					<label className='block'>
						<span className='text-gray-700'>Address</span>
						<textarea
							name='address'
							required
							className='py-2 px-3 mt-1
							w-full
							rounded-md
							border
							border-gray-300
							shadow-sm
							focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
							rows={3}></textarea>
					</label>
				</div>
				<button
					type='submit'
					disabled={submitting}
					className='bg-blue-500 text-white px-4 py-2 mt-4 rounded-md transition-all
					hover:bg-blue-600 hover:shadow-md active:bg-blue-700
					disabled:opacity-75 disabled:bg-blue-500 disabled:shadow-none'>
					Add User
				</button>
			</form>
		</main>
	);
};

export default Users;

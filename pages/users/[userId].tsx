import type { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
import type { DeleteResult } from "mongodb";
import { useState } from "react";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import Head from "next/head";
import clientPromise from "utils/mongodb";
import { User, Gender } from "models";

type props = { user?: User };

const UserPage: FunctionComponent<props> = ({ user }) => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [birthDate, setBirthDate] = useState(user.birthDate);
	const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
	const [gender, setGender] = useState(user.gender);
	const [address, setAddress] = useState(user.address);

	const editUser = async (event) => {
		event.preventDefault();
		setSubmitting(true);

		await fetch("/api/users/" + user.id, {
			body: JSON.stringify({ firstName, lastName, email, birthDate, phoneNumber, gender, address }),
			headers: { "Content-Type": "application/json" },
			method: "PUT"
		});

		setSubmitting(false);
	};

	const deleteUser = async (event) => {
		event.preventDefault();
		setSubmitting(true);

		const res = await fetch("/api/users/" + user.id, {
			method: "DELETE"
		});

		if (res.ok) {
			const result = (await res.json()) as DeleteResult;
			if (result.deletedCount == 1) {
				router.push("/users");
			}
		}

		setSubmitting(false);
	};

	return (
		<main className='flex flex-col items-center w-full flex-1 px-20'>
			<Head>
				<title>{user.firstName + " " + user.lastName}</title>
			</Head>
			<h1 className='text-xl font-bold'>{user.firstName + " " + user.lastName}</h1>
			<form className='mt-4 w-full max-w-lg' onSubmit={editUser}>
				<div className='flex flex-col gap-6'>
					<label className='block'>
						<span className='text-gray-700'>First name</span>
						<input
							type='text'
							name='firstName'
							value={firstName}
							onInput={(e) => setFirstName(e.currentTarget.value)}
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
							value={lastName}
							onInput={(e) => setLastName(e.currentTarget.value)}
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
							value={email}
							onInput={(e) => setEmail(e.currentTarget.value)}
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
							value={birthDate}
							onInput={(e) => setBirthDate(e.currentTarget.value)}
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
							value={phoneNumber}
							onInput={(e) => setPhoneNumber(e.currentTarget.value)}
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
							value={gender}
							onInput={(e) => setGender(e.currentTarget.value as Gender)}
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
							value={address}
							onInput={(e) => setAddress(e.currentTarget.value)}
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
				<div className='flex items-center justify-between'>
					<button
						type='submit'
						disabled={submitting}
						className='bg-blue-500 text-white px-4 py-2 mt-4 rounded-md transition-all
					hover:bg-blue-600 hover:shadow-md active:bg-blue-700
					disabled:opacity-75 disabled:bg-blue-500 disabled:shadow-none'>
						Edit User
					</button>
					<button
						type='button'
						disabled={deleting}
						onClick={deleteUser}
						className='bg-red-500 text-white px-4 py-2 mt-4 rounded-md transition-all
					hover:bg-red-600 hover:shadow-md active:bg-red-700
					disabled:opacity-75 disabled:bg-red-500 disabled:shadow-none'>
						Delete User
					</button>
				</div>
			</form>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const userId = context.query.userId as string;
		const client = await clientPromise;
		const db = client.db();
		const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

		user.id = user._id.toString();
		delete user._id;
		return {
			props: { user }
		};
	} catch (error) {
		return {
			notFound: true
		};
	}
};

export default UserPage;

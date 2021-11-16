import type { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
import clientPromise from "utils/mongodb";
import { User } from "models";
import Head from "next/head";
import UsersList from "components/usersList";

type props = { users?: User[] };

const Users: FunctionComponent<props> = ({ users }) => {
	return (
		<main className='flex flex-col items-center w-full flex-1 px-20'>
			<Head>
				<title>Users</title>
			</Head>
			<h1 className='text-xl font-bold'>Users</h1>
			{users?.length <= 0 ? <div>There are no users!</div> : <UsersList users={users} />}
		</main>
	);
};

export const getServerSideProps: GetServerSideProps<props> = async (_context) => {
	try {
		const client = await clientPromise;
		const db = client.db();
		const users = (await db
			.collection("users")
			.find({})
			.map(({ _id, ...d }) => ({ id: _id.toString(), ...d }))
			.toArray()) as User[];
		console.log(users);
		return {
			props: { users }
		};
	} catch (error) {
		return {
			props: {}
		};
	}
};

export default Users;

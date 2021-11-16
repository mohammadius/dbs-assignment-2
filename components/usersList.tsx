import type { FunctionComponent } from "react";
import { User } from "models";
import Link from "next/link";

const UsersList: FunctionComponent<{ users: User[] }> = ({ users }) => {
	return (
		<ul className='flex flex-col items-center gap-2 mt-4'>
			{users.map((user) => (
				<li key={user.id.toString()}>
					<Link href={`/users/${user.id}`}>
						<a className='text-lg font-medium underline text-gray-800 hover:text-blue-600 transition-colors'>
							{user.firstName + " " + user.lastName}
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default UsersList;

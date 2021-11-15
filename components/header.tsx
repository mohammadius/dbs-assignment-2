import Link from "next/link";

const Header = () => {
	return (
		<header className='w-full border-b mb-4'>
			<ul className='flex items-center justify-center h-20 gap-8'>
				<li>
					<Link href='/users'>
						<a>Users</a>
					</Link>
				</li>
				<li>
					<Link href='/users/add'>
						<a>Add New User</a>
					</Link>
				</li>
			</ul>
		</header>
	);
};

export default Header;

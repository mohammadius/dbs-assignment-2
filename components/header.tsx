import Link from "next/link";

const Header = () => {
	return (
		<header className='w-full border-b mb-4 shadow-md'>
			<ul className='flex items-center justify-center h-20 gap-8'>
				<li>
					<Link href='/users'>
						<a className='text-base font-medium text-gray-500 hover:text-gray-900 transition-colors'>Users</a>
					</Link>
				</li>
				<li>
					<Link href='/users/add'>
						<a className='text-base font-medium text-gray-500 hover:text-gray-900 transition-colors'>Add New User</a>
					</Link>
				</li>
			</ul>
		</header>
	);
};

export default Header;

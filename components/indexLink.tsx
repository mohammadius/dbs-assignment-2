import Link from "next/link";

const IndexLink = ({ href, text }) => {
	return (
		<Link href={href}>
			<a className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 transition-all shadow-lg hover:shadow-md focus:shadow-none'>
				<h3 className='text-2xl font-bold'>{text}</h3>
			</a>
		</Link>
	);
};

export default IndexLink;

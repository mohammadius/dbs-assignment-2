import Head from "next/head";
import IndexLink from "components/indexLink";

const Home = () => {
	return (
		<main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
			<Head>
				<title>DB System Assignment #2</title>
			</Head>
			<h1 className='text-6xl font-bold'>DB System Assignment #2</h1>
			<div className='flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
				<IndexLink href='/users' text='All Users &rarr;' />
				<IndexLink href='/users/add' text='Add New User &rarr;' />
			</div>
		</main>
	);
};

export default Home;

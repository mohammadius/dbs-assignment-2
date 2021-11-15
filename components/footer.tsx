const Footer = () => {
	return (
		<footer className='flex items-center justify-center w-full h-20 border-t shadow-2xl mt-4'>
			<a
				className='flex items-center justify-center'
				href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
				target='_blank'
				rel='noopener noreferrer'>
				Powered by <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' />
			</a>
		</footer>
	);
};

export default Footer;

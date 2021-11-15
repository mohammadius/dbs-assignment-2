import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Footer from "components/footer";
import Header from "components/header";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}

export default MyApp;

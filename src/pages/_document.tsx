import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<meta charSet="utf-8" />
				<link
					rel="icon"
					type="image/x-icon"
					href='/images/favicon.ico'
				/>
				<meta name="theme-color" content="#e0dbdb" />
				<meta name="keywords" content="tinh, web developer, github, typescript" />
				<meta name="author" content="tinh" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

			</Head>
			{/* bg-gray-300 bg-gradient-to-b from-[#e0dbdb] to-[#e0dbdb]
			 text-black dark:from-[#746767] dark:to-[#463a3a81] dark:text-white */}
			<body className="bg-[#e0dbdb] text-black dark:bg-[#746767] dark:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
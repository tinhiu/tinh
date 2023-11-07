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
			
			<body className="bg-[#e2dcdc] text-black dark:bg-[#746767] dark:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
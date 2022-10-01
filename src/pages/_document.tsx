import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<meta charSet="utf-8" />
				<link
					rel="icon"
					type="image/png"
					href="https://avatars.githubusercontent.com/u/77063123?s=96&v=4"
				/>
				<meta name="theme-color" content="#e0dbdb" />
				<meta name="keywords" content="tinh, web developer, github, typescript" />
				<meta name="author" content="tinh" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

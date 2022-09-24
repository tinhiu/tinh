import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { SWRConfig } from 'swr';
import { StrictMode, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/custom.scss';
import Nav from '../components/Nav';
import { AnimatePresence } from 'framer-motion';
import Song from '../components/Song';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type PageProps = {
	lanyard?: unknown;
	pinnedRepos?: unknown;
};
function MyApp({ Component, pageProps, router }: AppProps<PageProps>) {
	return (
			<StrictMode>
				<Head>
					<meta charSet="utf-8" />
					<title>Tinh`</title>
					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="width=device-width,initial-scale=1" />
					<meta name="theme-color" content="#000000" />
					<meta name="keywords" content="tinh, web developer, github, typescript" />
					<meta name="description" content="Tinh` - Software Engineer" />
					<meta name="author" content="Tinh`" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				</Head>
				<div
					className="text-black dark:text-white flex flex-row justify-center w-full h-full
	         bg-gradient-to-b from-[#e0dbdb] to-[#ffffffb4]
	         dark:from-[#746767] dark:to-[#463a3a81] min-h-screen"
				>
					<Nav />
					<div className="w-[80%] md:w-[45rem]">
						<AnimatePresence mode="wait">
							<Component {...pageProps} key={router.pathname} />
						</AnimatePresence>
					</div>
					<Song />
				</div>
			</StrictMode>
	);
}

export default MyApp;

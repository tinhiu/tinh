import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { SWRConfig } from 'swr';
import { StrictMode, useEffect, useRef } from 'react';
import Head from 'next/head';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/custom.scss';
import Nav from '../components/Nav';
import { AnimatePresence, useScroll, useSpring, motion } from 'framer-motion';
import Song from '../components/Song';
import ScrollToTop from '../components/ScrollToTop';
import { useLanyardWS } from 'use-lanyard';
import { loadCursor } from '../util/cursor';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
type PageProps = {
	userLanyard?: unknown;
	pinnedRepos?: unknown;
};
export const DISCORD_ID = '885439540268003338';

function MyApp({ Component, pageProps, router }: AppProps<PageProps>) {
	
	const userLanyard = useLanyardWS(DISCORD_ID);
	const ballCanvas = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (typeof window === 'undefined' || !ballCanvas.current) {
			return;
		}

		return loadCursor(ballCanvas.current);
	}, []);
	return (
		<StrictMode>
			<Head>
				<title>tinh</title>
				<meta name="viewport" content="width=device-width,initial-scale=1" />
			</Head>
			<div
				className="flex h-full min-h-screen w-full flex-row justify-center bg-gradient-to-b
	         from-[#e0dbdb] to-[#e0dbdb] text-black
	         dark:from-[#746767] dark:to-[#463a3a81] dark:text-white"
			>
				<Nav />
				<div className="w-[80%] md:w-[45rem]">
					<AnimatePresence mode="wait">
						<Component {...pageProps} key={router.pathname} userLanyard={userLanyard} />
					</AnimatePresence>
					<ScrollToTop />
				</div>
				<Song user={userLanyard} />
				<div
					ref={ballCanvas}
					className="ball-transitions pointer-events-none fixed
					z-[100] h-6 w-6 rounded-full border border-gray-500 bg-transparent
					opacity-0 shadow-md duration-200 dark:border-amber-100"
				/>
			</div>
		</StrictMode>
	);
}

export default MyApp;

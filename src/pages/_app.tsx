import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { StrictMode, useEffect, useRef } from 'react';
import Head from 'next/head';
import GoogleAnalytics from "@bradgarropy/next-google-analytics";

import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useState } from "react";

import Nav from '../components/Nav';
import Song from '../components/Song';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Data, useLanyardWS } from 'use-lanyard';
import { loadCursor } from '../util/cursor';

import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/custom.scss';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
type PageProps = {
	userLanyard?: Data | any;
	dehydratedState: unknown
};
export const DISCORD_ID = '885439540268003338';
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			refetchOnWindowFocus: false, // default: true
// 		},
// 	},
// });
function MyApp({ Component, pageProps, router }: AppProps<PageProps>) {
	const userLanyard = useLanyardWS(DISCORD_ID);
	const ballCanvas = useRef<HTMLDivElement>(null);
	const [queryClient] = useState(() => new QueryClient());
	useEffect(() => {
		if (typeof window === 'undefined' || !ballCanvas.current) {
			return;
		}

		return loadCursor(ballCanvas.current);
	}, []);
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Head>
						<title>tinh</title>
						<meta name="viewport" content="width=device-width,initial-scale=1" />
					</Head>
					<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string} />
					<div
						className="flex h-full min-h-screen w-full flex-col justify-start bg-gradient-to-b from-[#e0dbdb] to-[#e0dbdb] text-black dark:from-[#746767] dark:to-[#463a3a81] dark:text-white"
					>
						<Nav />
						<div className="mx-auto w-[85%] md:max-w-3xl">
							<AnimatePresence mode="wait">
								<Component {...pageProps} key={router.pathname} userLanyard={userLanyard} />
							</AnimatePresence>
						</div>
						<Song user={userLanyard} />
						<div
							ref={ballCanvas}
							className="ball-transitions pointer-events-none fixed
						z-[100] h-4 w-4 rounded-full border-4 border-gray-500 bg-transparent
						opacity-0 duration-200 dark:border-amber-100 "
						/>
						<Footer />
						<Toaster reverseOrder={true} />
						<ScrollToTop />

					</div>
					<ReactQueryDevtools initialIsOpen />
				</Hydrate>
			</QueryClientProvider>
		</StrictMode>
	);
}

export default MyApp;

import type { AppProps } from 'next/app';

import { Router } from 'next/router';
import NProgress from 'nprogress';
import { StrictMode, useEffect, useRef } from 'react';
import Head from 'next/head';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

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
};
export const DISCORD_ID = '885439540268003338';
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
		},
	},
});
function MyApp({ Component, pageProps, router }: AppProps<PageProps>) {
	const userLanyard = useLanyardWS(DISCORD_ID);
	const ballCanvas = useRef<HTMLDivElement>(null);
	const showFooter = router.route === '/';
	useEffect(() => {
		if (typeof window === 'undefined' || !ballCanvas.current) {
			return;
		}

		return loadCursor(ballCanvas.current);
	}, []);

	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>tinh</title>
					<meta name="viewport" content="width=device-width,initial-scale=1" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					{/* <link href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap" rel="stylesheet" /> */}
				</Head>
				<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string} />
				<SpeedInsights />
				<div className="relative flex w-full flex-col">
					<Nav />
					<div className="mx-auto w-[85%] md:max-w-3xl">
						<AnimatePresence mode="wait">
							<Component {...pageProps} key={router.pathname} userLanyard={userLanyard} />
						</AnimatePresence>
					</div>
					<>{showFooter && <Footer />}</>
				</div>
				<Song user={userLanyard} />
				<div
					ref={ballCanvas}
					className="ball-transitions pointer-events-none fixed
						z-[100] h-4 w-4 rounded-full border-2 border-gray-500 bg-transparent
						opacity-0 duration-200 dark:border-amber-100 "
				/>
				<Toaster reverseOrder={true} />
				<ScrollToTop />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</StrictMode>
	);
}

export default MyApp;

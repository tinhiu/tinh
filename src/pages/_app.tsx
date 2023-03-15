import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { SWRConfig } from 'swr';
import { StrictMode, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useLanyardWS, useLanyard} from 'use-lanyard';

import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/custom.scss';
import Nav from '../components/Nav';
import { AnimatePresence } from 'framer-motion';
import Song from '../components/Song';
import ScrollToTop from '../components/ScrollToTop';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
type PageProps = {
	lanyard?: unknown;
	pinnedRepos?: unknown;
};
export const DISCORD_ID = '885439540268003338';

function MyApp({ Component, pageProps, router }: AppProps<PageProps>) {
	//const {data: userLanyard} = useLanyard(DISCORD_ID);
	const userLanyard = useLanyardWS(DISCORD_ID);
	return (
		<StrictMode>
			<Head>
			<title>tinh</title>
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			
			</Head>
			<div
				className="text-black dark:text-white flex flex-row justify-center w-full h-full
	         bg-gradient-to-b from-[#e0dbdb] to-[#e0dbdb]
	         dark:from-[#746767] dark:to-[#463a3a81] min-h-screen"
			>
				<Nav />
				<div className="w-[80%] md:w-[45rem]">
					<AnimatePresence mode="wait">
						<Component {...pageProps} key={router.pathname} userLanyard={userLanyard}/>
					</AnimatePresence>
				<ScrollToTop />
				</div>
				<Song user={userLanyard} />
			</div>
		</StrictMode>
	);
}

export default MyApp;

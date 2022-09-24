import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Home: NextPage = () => {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 7 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ ease: 'easeInOut', duration: 0.4 }}
				className="mt-24 w-full mb-32"
			>
				<h1 className="mt-36 font-bold text-4xl md:text-5xl mb-4">Hey, I'm Conrad 👋</h1>
				<p className="text-gray-800 dark:text-gray-300 leading-6 tracking-wide mb-12">
					I'm a self-taught software engineer from the United States. I'm currently pursuing
					full-stack web development to create stunning user experiences on the front-end, and
					scalable and secure infrastructure on the backend.
				</p>

				<h2 className="font-medium text-3xl mb-4">What I Do 💭</h2>
				<p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-12">
					I'm passionate about everything technology; from designing and developing software, to
					understanding how the many moving parts of the internet work together, to cybersecurity,
					systems, programming, and so much more. I strive to learn more about these things every
					day, and utilize my knowledge to further understand <i>how</i> or <i>why</i> the
					technology around us works.
				</p>

				<h2 className="font-medium text-3xl mb-4">Technologies 💻</h2>
				<p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-6">
					I use a variety of tools to streamline my development process and increase the quality of
					both my code, and my projects. Below is a list of technologies and languages I've had
					experience with in the past, or use currently.
				</p>

				<h2 className="font-medium text-3xl mb-4">Projects 🛠️</h2>
				<p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-6">
					In my free time, I enjoy creating open source projects on{' '}
					<a
						href="https://github.com/cnrad"
						rel="noreferrer"
						className="font-semibold text-violet-500 hover:underline"
					>
						GitHub
					</a>
					, so I can learn from others and showcase what I know. In total, all of my open sourced
					projects have earnt me <span className="font-bold text-black dark:text-slate-200">3</span>{' '}
					stars on GitHub, and <span className="font-bold text-black dark:text-slate-200">2</span>{' '}
					forks. Below are some of my most popular repositories.
				</p>
			</motion.div>
		</>
	);
};

export default Home;

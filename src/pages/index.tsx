import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import { age } from '../util/age';
import Technologies from '../components/technologies';
const Home: NextPage = () => {
	const bday = new Date('23 October 2001');
	const ageMilliseconds = Date.now();

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 7 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ ease: 'easeInOut', duration: 0.4 }}
				className="mt-24 w-full mb-32"
			>
				<div className="space-y-4">
					<h1 className="mt-36 font-bold text-4xl md:text-5xl">Hi, I'm Tinh</h1>
					<p className="text-gray-800 dark:text-gray-300 leading-6 tracking-wide mb-1">
						I'm {Math.floor(age)} years old and i am studying information technology at a university
						in Ho Chi Minh city, i'm trying to become a web developer
					</p>
					<h2 className="mt-36 font-bold text-4xl md:text-3xl">My hobbies</h2>
					<p className="text-gray-800 dark:text-gray-300 leading-6 tracking-wide mb-12 items-start">
						I like listening to music the most, coding, playing games, and sometimes i playing soccer outside,
						i'm a bit interesting in editing short video on ig by after effect, u can find my edits <a href={"https://www.instagram.com/anotherdayily_/"} target="_blank" rel="noopener">here</a>
					</p>
				</div>
				
				{/* Technologies */}
				<div className="space-y-4">
					<h2 className="mt-36 text-4xl md:text-3xl">Technologies 💻</h2>
					<Technologies />
				</div>
			</motion.div>
		</>
	);
};

export default Home;

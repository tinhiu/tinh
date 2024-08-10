import { motion } from 'framer-motion';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 7 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ ease: 'easeInOut', duration: 0.4 }}
				className="mt-10 w-full"
			>
				<p>I'm about . . .</p>
			</motion.div>
		</>
	);
};

export default Home;

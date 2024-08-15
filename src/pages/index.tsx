import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import LrcPlayer from '../components/Player';

const Home: NextPage = () => {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 7 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ ease: 'easeInOut', duration: 0.4 }}
				className="flex w-full flex-col items-center justify-center"
			>
				<LrcPlayer />
			</motion.div>
		</>
	);
};

export default Home;

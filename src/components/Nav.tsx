import { motion } from 'framer-motion';
import Link from 'next/link';
import { classNames } from '../util/classNames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RiSunLine } from 'react-icons/ri';
import { FiMoon } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const NavLink = ({ name, link, selected }: { name: string; link: string; selected: boolean }) => {
	return (
		<Link href={link}>
			<a
				className={classNames(
					selected
						? 'bg-black/10 dark:bg-[#c8c8dc]/10'
						: 'bg-transparent hover:bg-gray-700/5 dark:hover:bg-[#c8c8dc]/5 dark:text-white',
					'cursor-pointer px-4 py-2 text-sm rounded-md text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all duration-75'
				)}
			>
				{name}
			</a>
		</Link>
	);
};
const Nav = () => {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState(false);
	const handleMenu = () => {
		setOpenMenu(!openMenu);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ cease: 'easeInOut', duration: 0.5 }}
			className="hidden z-[999] fixed w-[90%] md:w-[50rem] sm:flex flex-row justify-between items-center px-4 py-2 mt-4 md:mt-6 rounded-md bg-white/60 dark:bg-[#5f5555ad] dark:border-white/30 border border-slate-800/50 backdrop-blur-lg shadow-lg"
		>
			<div className="flex flex-row items-center justify-center gap-2">
				<NavLink name="Home" link="/" selected={router.pathname === '/'} />
				<NavLink name="Contact" link="/contact" selected={router.pathname === '/contact'} />
				<NavLink name="Music" link="/music" selected={router.pathname === '/music'} />
			</div>
			<div className="flex flex-row items-center justify-center gap-4">
				<ThemeToggle />
			</div>
		</motion.div>
	);
};

export default Nav;

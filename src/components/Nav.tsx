import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { classNames } from '../util/classNames';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { HiMenu, HiX } from 'react-icons/hi';
import useOnClickOutside from '../hooks/useClickOutSide';

const NavLink = ({ name, link, selected }: { name: string; link: string; selected: boolean }) => {
	return (
		<Link href={link}>
			<a
				className={classNames(
					selected
						? 'bg-black/10 dark:bg-[#c8c8dc]/10'
						: 'bg-transparent hover:bg-gray-700/5 dark:hover:bg-[#c8c8dc]/5 dark:text-white',
					'cursor-pointer px-4 py-2 text-sm rounded-lg text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all duration-75'
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

	//HTMLButtonElement
	const ref = useRef<HTMLDivElement>(null);
	const clickOutsidehandler = (e: any) => {
		if(e.target.tagName === "DIV") {
			setOpenMenu(false);
		}
		return ;
		
	};
	useOnClickOutside(ref, clickOutsidehandler);
	
	const MobileLandingButton = ({
		name,
		link,
		selected,
		onClick,
	}: {
		name: string;
		link: string;
		selected: boolean;
		onClick: () => void;
	}) => {
		return (
			<Link href={link}>
				<a
					className={classNames(
						selected ? 'bg-black/20 dark:bg-[#777777e6]' : 'bg-transparent dark:text-white',
						'flex flex-grow justify-center border-slate-800/30 cursor-pointer w-auto py-4 text-base text-black/80 dark:text-white/80 dark:border-[#ffffff]/30 transition-all duration-75'
					)}
					onClick={onClick}
				>
					{name}
				</a>
			</Link>
		);
	};
	return (
		<>
		
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ cease: 'easeInOut', duration: 0.5 }}
				className="hidden z-[10] fixed w-[90%] md:w-[50rem] sm:flex flex-row justify-between items-center px-4 py-2 mt-4 md:mt-6 rounded-lg bg-white/60 dark:bg-[#5f5555ad] dark:border-white/30 backdrop-blur-lg shadow-lg"
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
			<motion.div className="sm:hidden z-[990] fixed w-full flex flex-row justify-between items-center px-4 py-3 bg-white/60 dark:bg-[#5f5555ad] dark:border-white/30 border-b border-slate-800/50 backdrop-blur-lg shadow-lg">
				<div  className="flex flex-row items-center justify-center">
					<button onClick={handleMenu} className="h-9 w-9 flex items-center justify-center">
						{!openMenu ? <HiMenu className="w-7 h-7" /> : <HiX className="w-7 h-7" />}
					</button>
				</div>
				<div className="flex flex-row items-center justify-between gap-2">
					<ThemeToggle />
				</div>
				
			</motion.div>
			<AnimatePresence mode="wait">
				{openMenu && (
					<>
						<motion.div
							key="NavBackdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1, ease: 'easeInOut' }}
							className=" sm:hidden z-[500] fixed w-full h-screen overflow-hidden backdrop-blur-md bg-black/10 flex flex-col items-center justify-content"
						/>

						<motion.div
							ref={ref} 
							key="NavMenu"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1, ease: 'easeInOut' }}
							className="flex sm:hidden flex-col items-center justify-start mt-16 fixed w-full h-auto z-[700] bg-white dark:bg-[#a5a5a5]  border-slate-800/30"
						>
							<div className="flex flex-col w-full justify-evenly">
								<MobileLandingButton
									name="Home"
									link="/"
									selected={router.pathname === '/'}
									onClick={() => {
										setOpenMenu(false);
									}}
								/>
								<MobileLandingButton
									name="Contact"
									link="/contact"
									selected={router.pathname === '/contact'}
									onClick={() => {
										setOpenMenu(false);
									}}
								/>
								<MobileLandingButton
									name="Music"
									link="/music"
									selected={router.pathname === '/music'}
									onClick={() => {
										setOpenMenu(false);
									}}
								/>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default Nav;

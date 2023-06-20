import { motion, AnimatePresence, useSpring, useScroll, useCycle } from 'framer-motion';
import Link from 'next/link';
import { classNames } from '../util/classNames';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import useOnClickOutside from '../hooks/useClickOutSide';
import { MenuToggle } from './MenuToggle';

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
	const containerRef = useRef(null);
	const router = useRouter();
	const [isOpen, toggleOpen] = useCycle(false, true);
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});
	//HTMLButtonElement
	const ref = useRef<HTMLDivElement>(null);
	const clickOutsidehandler = (e: any) => {
		if (e.target.tagName === 'BUTTON' || e.target.tagName === 'NAV') {
			toggleOpen();
			return;
		}
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
						selected ? 'bg-black/20 dark:bg-[#b7afafe6]' : 'bg-transparent dark:bg-[#827676] dark:text-white',
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
				className="fixed z-[10] mt-4 hidden w-[90%] flex-row items-center justify-between rounded-lg bg-white/60 px-4 py-2 shadow-md backdrop-blur-lg dark:border-white/30 dark:bg-[#5f5555ad] sm:flex md:mt-6 md:w-[50rem]"
			>
				<div className="flex flex-row items-center justify-center gap-2">
					<NavLink name="Home" link="/" selected={router.pathname === '/'} />
					<NavLink name="Contact" link="/contact" selected={router.pathname === '/contact'} />
					<NavLink name="Music" link="/music" selected={router.pathname === '/music'} />
				</div>
				<div className="flex flex-row items-center justify-center gap-4">
					<ThemeToggle />
				</div>
				<motion.div className="progress-bar rounded-lg dark:bg-neutral-400" style={{ scaleX }} />
			</motion.div>
			<motion.div className="fixed z-[990] flex w-full flex-row items-center justify-between border-b border-slate-800/50 bg-white/60 px-4 py-3 shadow-md backdrop-blur-lg dark:border-white/30 dark:bg-[#5f5555ad] sm:hidden">
				<div className="flex flex-row items-center justify-center">
					<motion.div
						className="flex h-9 w-9 items-center justify-center"
						animate={isOpen ? 'open' : 'closed'}
					>
						<MenuToggle toggle={() => toggleOpen()} />
					</motion.div>
				</div>
				<div className="flex flex-row items-center justify-between gap-2">
					<ThemeToggle />
				</div>
				<motion.div className="progress-bar rounded-lg dark:bg-neutral-400" style={{ scaleX }} />
			</motion.div>
			<AnimatePresence mode="wait">
				{isOpen && (
					<>
						<motion.nav
							ref={containerRef}
							key="NavBackdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
							className=" justify-content fixed z-[500] flex h-screen w-full flex-col items-center overflow-hidden bg-black/10 backdrop-blur-md sm:hidden"
						/>

						<motion.div
							ref={ref}
							key="NavMenu"
							initial={{ opacity: 0, y: -130 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -150 }}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
							className="fixed z-[700] mt-16 flex h-auto w-full flex-col items-center justify-start border-slate-800/30
							 bg-white dark:bg-[#8c8484] sm:hidden"
						>
							<div className="flex w-full flex-col justify-evenly">
								<MobileLandingButton
									name="Home"
									link="/"
									selected={router.pathname === '/'}
									onClick={() => {
										toggleOpen();
									}}
								/>
								<MobileLandingButton
									name="Contact"
									link="/contact"
									selected={router.pathname === '/contact'}
									onClick={() => {
										toggleOpen();
									}}
								/>
								<MobileLandingButton
									name="Music"
									link="/music"
									selected={router.pathname === '/music'}
									onClick={() => {
										toggleOpen();
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

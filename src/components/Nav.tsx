import { motion } from "framer-motion";
import Link from "next/link";
import { classNames } from "../util/classNames";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { BsSlashLg } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { SiSpotify, } from "react-icons/si";
import { FcContacts, } from "react-icons/fc";
import ThemeToggle from "./ThemeToggle";
const NavLink = ({ icon, link, selected }: { icon: ReactElement; link: string; selected: boolean }) => {
	return (
		<Link href={link}>
			<a
				className={classNames(
					selected
						? "bg-[#faebd7]/70  dark:bg-white/30"
						: "bg-transparent hover:bg-gray-700/5 dark:hover:bg-[#c8c8dc]/5 dark:text-white",
						"cursor-pointer px-2 py-1 rounded-full text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all duration-300"
				)}
			>
				{icon}
			</a>
		</Link>
	);
};
const Nav = () => {
	const router = useRouter();
	return (
		<header className="sticky top-0 z-30 mb-5 backdrop-blur">
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ cease: "easeInOut", duration: 0.5 }}
				className=" mx-auto w-[85%] max-w-3xl"
			>
				<nav className="flex items-center justify-between space-x-3 py-4 sm:py-2">
					<NavLink link="/" selected={router.pathname === "/"}
						icon={<BsSlashLg size={21} />} />
					<div className="grow"></div>
					<NavLink link="/contact" selected={router.pathname === "/contact"}
						icon={<FcContacts size={21} />} />
					<NavLink link="/spotify" selected={router.pathname === "/music" || router.pathname === "/spotify"}
						icon={<SiSpotify size={21} className="text-[#1DB954] dark:text-[#00ff00]" />} />
					<div className="divider-y h-4"></div>
					<ThemeToggle />
				</nav>
				<motion.div className="w-full border border-gray-600 opacity-10 dark:border-white" />
			</motion.div >
		</header>
	);
};

export default Nav;

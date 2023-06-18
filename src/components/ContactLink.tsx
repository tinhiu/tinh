import React, { ReactElement } from 'react';
const ContactLink = ({ text, icon, link }: { text: string; icon: ReactElement; link: string }) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noreferrer noopener"
			className={
				'group row-start-3 mb-4 flex cursor-pointer flex-row items-center rounded-md bg-white/70 p-4 shadow-none shadow-white  dark:bg-[#b1a5a5d4] sm:duration-300 sm:hover:scale-105 sm:hover:shadow-md sm:hover:ease-out'
			}
		>
			{icon}
			<h1 className="mx-3 text-sm font-medium text-black/80 dark:text-white/75">{text}</h1>
		</a>
	);
};

export default ContactLink;

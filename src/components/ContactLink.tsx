import React, { ReactElement } from "react";
const ContactLink = ({
    text,
    icon,
    link,   
}:{
    text: string, 
    icon: ReactElement,
    link: string
}
) => {
    
    return (
        <a
            
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className={
                "group shadow-white shadow-none sm:hover:shadow-lg mb-4 row-start-3 flex flex-row items-center bg-white/70 dark:bg-[#b1a5a5d4] sm:hover:scale-105  sm:duration-700 sm:hover:ease-out rounded-md p-4 cursor-pointer "
            }
        >
            {icon}
            <h1 className="font-medium text-sm text-black/80 dark:text-white/75 mx-3">{text}</h1>
        </a>
    );
};

export default ContactLink;

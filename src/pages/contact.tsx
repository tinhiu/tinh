import { motion } from "framer-motion"
import { AiFillLinkedin } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { SiDiscord, SiFacebook } from "react-icons/si";
import ContactLink from "../components/ContactLink";
import Message from "../components/Message"

export default function Contact() {
    return ( 
        <>
            <motion.div
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ ease: "easeInOut", duration: 0.4 }}
                className="my-16 w-full"
            >
                <h1 className="mb-4 mt-8 text-3xl font-bold text-black dark:text-white">Let's have a connection 📨</h1>
                <p className="mb-[1.7rem] text-gray-800 dark:text-gray-200">
                    You can contact me through any of the forms below.
                    I am very happy to talk with you. I'll reply to you as quickly as possible
                </p>


                <div className="mb-16 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                    <Message />

                    <div className="row-start-1 md:row-auto">
                    <ContactLink
                        text="tinh#5050"
                        icon={<SiDiscord className="h-6 w-6 text-[#5865F2] dark:text-[#f0f8ff]" />}
                        link="https://discord.com/users/885439540268003338"
                    />

                    <ContactLink
                        text="@buitinh"
                        icon={<SiFacebook className="h-6 w-6 text-[#1DA1F2] dark:text-[#f0f8ff]" />}
                        link="https://fb.com/buitinh.aep"
                    />

                    <ContactLink
                        text="tjnhqw@gmail.com"
                        icon={<FiMail className="h-6 w-6 text-gray-400 dark:text-[#f0f8ff]" />}
                        link="mailto:tjnhqw@gmail.com"
                    />
                    <ContactLink
                        text="bui-tinh"
                        icon={<AiFillLinkedin className="h-6 w-6 text-gray-400 dark:text-[#f0f8ff]" />}
                        link="https://www.linkedin.com/in/bui-tinh-7b9166235/"
                    />
                </div>
                </div>
            </motion.div>
        </>
     );
}

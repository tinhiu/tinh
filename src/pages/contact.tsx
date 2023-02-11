import { motion } from "framer-motion"
import { FiMail } from "react-icons/fi";
import { SiDiscord, SiFacebook, SiTwitter } from "react-icons/si";
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
                className="mt-36 w-full"
            >
                <h1 className="text-black dark:text-white font-bold text-3xl mb-3 mt-8">Let's have a connection 📨</h1>
                <p className="text-gray-800 dark:text-gray-200 mb-6">
                    You can contact me through any of the forms below. I am very happy to talk with you. I'll reply to you as quickly as possible
                </p>


                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 mb-20">
                    <Message />

                    <div className="row-start-1 md:row-auto">
                    <ContactLink
                        text="tinh#5050"
                        icon={<SiDiscord className="w-6 h-6 text-[#5865F2] dark:text-[#f0f8ff]" />}
                        link="https://discord.com/users/885439540268003338"
                    />

                    <ContactLink
                        text="@buitinh"
                        icon={<SiFacebook className="w-6 h-6 text-[#1DA1F2] dark:text-[#f0f8ff]" />}
                        link="https://fb.com/buitinh.aep"
                    />

                    <ContactLink
                        text="tjnhqw@gmail.com"
                        icon={<FiMail className="w-6 h-6 text-gray-400 dark:text-[#f0f8ff]" />}
                        link="mailto:tjnhqw@gmail.com"
                    />
                </div>
                </div>
            </motion.div>
        </>
     );
}

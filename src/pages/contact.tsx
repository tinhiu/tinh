import { motion } from "framer-motion"
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

                    
                </div>
            </motion.div>
        </>
     );
}

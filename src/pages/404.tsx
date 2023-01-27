import { motion } from "framer-motion";


function Error() {
    return ( 
        <motion.div
        initial={{ opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
        className="flex mt-36 w-full "
        >
            <h1 className="text-black dark:text-white font-bold text-2xl mb-3 mt-8 md:text-3xl">404 - Page Not Found🥲</h1>
        </motion.div>
    );
}

export default Error;
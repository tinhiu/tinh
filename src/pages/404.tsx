import { motion } from "framer-motion";


function Error() {
    return ( 
        <motion.div
        initial={{ opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
        className="mt-16 flex w-full"
        >
            <h1 className="mb-3 mt-8 text-2xl font-bold text-black dark:text-white md:text-3xl">404 - Page Not Found🥲</h1>
        </motion.div>
    );
}

export default Error;
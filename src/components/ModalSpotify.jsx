import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { HiExternalLink } from 'react-icons/hi';
const ModalSpotify = ({ user }) => {
    //console.log(JSON.stringify(user,null,4));
    if (!user || !user.spotify) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
                className="my-4 h-40 relative "
            >

                <span className="absolute w-full h-full scale-[0.96] hover:scale-[0.99]
                transition duration-500 hover:ease-out shadow-lg brightness-90 hover:brightness-100">
                    <a href="https://open.spotify.com/user/31lhz6y3u5ootzbuxbnkndz4x2ea"
                        target="_blank"
                        rel="norel"
                        className='cursor-pointer'>
                        <Image
                            src="https://i.scdn.co/image/ab6775700000ee85857be609ae822848766e7419"
                            className="drop-shadow-md object-cover object-bottom rounded-2xl -z-[10] saturate-150
                            blur-[2px] contrast-75"
                            alt={`me`}
                            layout='fill'
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="flex h-full flex-col justify-between p-6  ">
                            <span className="flex justify-between">
                                <SiSpotify size={24} />
                                <HiExternalLink size={24} />
                            </span>
                            <span className="flex flex-col">
                                <span className="font-extrabold ml-2 text-2xl">
                                    tinh`
                                </span>

                            </span>
                        </div>
                    </a>
                </span>
            </motion.div>

        );
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
            className="my-4 h-40 relative">
            <span className="absolute w-full h-full scale-[0.96] hover:scale-[0.99]
                transition duration-300 hover:ease-out shadow-lg brightness-100 hover:brightness-110 ">
                <a href={`https://open.spotify.com/track/${user.spotify.track_id}`}
                    target="_blank"
                    rel="norel"
                    className='cursor-pointer'>

                    <Image
                        src={user.spotify.album_art_url}
                        className="drop-shadow-md object-cover rounded-2xl -z-[10]"
                        alt={`${user.spotify.album}`}
                        layout='fill'
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="flex h-full flex-col justify-between p-6 ">
                        <span className="flex justify-between">
                            <SiSpotify size={24} />
                            <HiExternalLink size={24} />
                        </span>
                        <span className="flex flex-col">
                           
                            <span className="font-semibold sm:text-base text-sm">
                                I'm listening to
                                <span className="font-extrabold ml-2 text-lg">
                                    {user.spotify.song}
                                </span>
                            </span>
                            <span className='font-semibold sm:text-base text-sm'>
                                by
                                <span className="font-extrabold ml-2 text-lg">
                                    {user.spotify.artist.replace(/;/g, ',')}
                                </span>
                            </span>
                        </span>
                    </div>
                </a>
            </span>
        </motion.div>
    )
}

export default ModalSpotify
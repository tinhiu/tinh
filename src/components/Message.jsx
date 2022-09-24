import { useState } from "react";
import { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { MdOutlineMail } from 'react-icons/md'
import { RiSendPlane2Fill, RiMessage3Line } from "react-icons/ri";
import { ImSpinner2 } from "react-icons/im";
import { classNames } from "../util/classNames";

const Message = () => {
    const form = useRef();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [msgEmpty, setMsgEmpty] = useState(false);
    const [sending, setSending] = useState(false);


    // eslint-disable-next-line
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const sendEmail = (e) => {
        e.preventDefault();
        if (email === '' || message === '') {
            if (!email) {
                setEmailError(true);
                toast.error('Empty Email', {
                    duration: 3000,
                    id: 'email',
                    position: "bottom-center",
                    style: {
                        border: '1px solid #1e293b80',
                        color: 'red',
                    },
                },
                );
            }
            else {
                if (!emailRegex.test(email)) {
                    setEmailError(true);
                    toast.error('This is not an email!', {
                        duration: 3000,
                        id: 'email',
                        position: "bottom-center",
                        style: {
                            border: '1px solid #1e293b80',
                            color: 'red',
                        },

                    });
                }
            }
            if (!message) {

                setMsgEmpty(true);
                toast.error('Empty Message', {

                    duration: 4000,
                    id: 'mess',
                    position: "bottom-center",
                    style: {
                        border: '1px solid #1e293b80',
                        color: 'red',
                    },

                }
                );
            }
            return;
        }
        else {
            if (!emailRegex.test(email)) {
                setEmailError(true);
                toast.error('This is not an email!', {
                    duration: 3000,
                    id: 'email',
                    position: "bottom-center",
                    style: {
                        border: '1px solid #1e293b80',
                        color: 'red',
                    },
                }
                );
                return;
            }
        }
        setSending(true);
        const myPromise = emailjs.sendForm(
            process.env.NEXT_PUBLIC_YOUR_SERVICE_ID,
            process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID,
            form.current,
            process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY)
        toast.promise(myPromise, {
            loading: 'Sending ...',
            success: 'Thank you for connecting!',
            error: 'Failed something went wrong!',
        },
            {

                success: {
                    duration: 3000,
                    icon: '❤️',
                },
                error: {
                    duration: 4000,
                    icon: '❗'
                },

                position: "bottom-center"
            })
            .then((result) => {
                setSending(false);
                setEmail("");
                setMessage("");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setSending(false);
            })
    };

    return (
        <>
            
            <div className="md:col-span-2 row-span-3 bg-opacity-50 bg-white/80 dark:bg-[#b1a5a5d4] rounded-md p-4 ">
                <form ref={form} onSubmit={sendEmail} className="rounded-md border-gray-700 md:w-full">
                    <label
                        htmlFor="email-field"
                        className="block font-bold text-black dark:text-white"
                    >
                        Email
                    </label>
                    <div className="relative rounded-md flex items-center mb-4 ">
                        <MdOutlineMail size={'24px'} className='absolute ml-3 flex h-5 w-5' />
                        <input
                            className={classNames(
                                emailError
                                    ? " placeholder:text-gray-600 dark:placeholder:text-slate-300 border border-red-400"
                                    : " border  border-slate-300  dark:border-slate-400",
                                "block w-full p-2 rounded-md text-sm sm:text-sm pl-10 shadow-sm placeholder-slate-400 dark:bg-[#2a232373] dark:placeholder:text-white/40 focus:outline-none focus:border-[#b0a6a6] focus:ring-[#b0a6a6] focus:ring-1 dark:focus:border-[#d4d4d4] dark:focus:ring-[#d4d4d4]"
                            )
                            }
                            name='email'
                            autoComplete="off"
                            placeholder="your@email.com"
                            type={"email"}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(false);
                            }}
                        />
                    </div>
                    <label
                        htmlFor="message-field"
                        className="block font-bold text-black dark:text-white"
                    >
                        Message
                    </label>
                    <div className="relative rounded-md flex items-start mb-4">
                        <RiMessage3Line size={'24px'} className='absolute ml-[0.7rem] mt-2 flex h-5 w-5' />
                        <textarea
                            className={classNames(
                                msgEmpty
                                    ? "placeholder:text-gray-600 dark:placeholder:text-slate-300 border border-red-400"
                                    : "border border-slate-300 dark:border-slate-400",
                                "block w-full p-2 dark:bg-[#2a232373] rounded-md text-sm sm:text-sm pl-10 shadow-sm placeholder-slate-400 dark:placeholder:text-white/40  focus:outline-none focus:border-[#b0a6a6] focus:ring-[#b0a6a6] focus:ring-1 min-h-[3rem] dark:focus:border-[#d4d4d4] dark:focus:ring-[#d4d4d4]    "
                            )}
                            name='message'
                            rows={7}
                            id="email-field"
                            placeholder="leave your message here"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setMsgEmpty(false);
                            }}
                        />
                    </div>
                    <div className="flex flex-row-reverse">
                        <button type="submit" className="flex items-center cursor-pointer bg-[#e3d8d8] px-3 py-2 font-semibold rounded-3xl shadow-button transition duration-700 hover:ease-out hover:scale-110 hover:bg-[#dab6b6] dark:bg-[#847169de] dark:hover:bg-[#cca897df]">
                            Send
                            {!sending && <RiSendPlane2Fill className="ml-2 " />}
                            {sending && <ImSpinner2 className="w-4 h-4 ml-2 animate-spin" />}
                        </button>
                    </div>

                </form>
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </>
    );
};

export default Message;
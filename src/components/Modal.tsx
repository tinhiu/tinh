import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import type { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';
import { MdOutlineClose } from 'react-icons/md'
type Props = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	title: ReactNode;
	children: ReactNode;
	focusRef?: MutableRefObject<HTMLElement | null>;
	description?: string;
	image?: string;
};
function Modal({ isOpen, image, ...props }: Props) {
	const close = () => {
		props.setIsOpen(false);
	};
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog open={isOpen} onClose={close} as="div"
				className="fixed inset-0 z-[99] overflow-y-auto"
				initialFocus={props.focusRef}
			>
				<Dialog.Panel
					className="w-full ">
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-1000"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[250px] dark:bg-neutral-700/5">
								<Image
									src={image as string}
									alt="bg"
									layout="fill"
									className={`h-auto w-full object-cover blur-lg backdrop-blur-[250px] transition duration-700`}
									loading="lazy"
									decoding="async"
								/>
							</Dialog.Overlay>
						</Transition.Child>

						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-400"
							enterFrom="opacity-0 scale-75"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-600"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="z-99 relative my-8 inline-block w-full max-w-xl overflow-hidden
							 rounded-2xl bg-neutral-200 p-6 text-left align-middle shadow-lg shadow-neutral-600/50
							  transition-all dark:bg-neutral-200">
								<div className="relative">
									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[#1DB954]">
										{props.title}
									</Dialog.Title>

									<div className="absolute right-0 top-0 text-xl">
										<button type="button"
											className="rounded-full p-2 leading-none 
											hover:bg-slate-500/40 hover:delay-200 dark:text-black"
											onClick={close}>
											<MdOutlineClose size={17} />
										</button>
									</div>
								</div>

								{props.description && (
									<div className="mt-2">
										<p className="text-sm text-gray-100">{props.description}</p>
									</div>
								)}

								<div className="mt-4">{props.children}</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog.Panel>
			</Dialog>
		</Transition>
	);
}

export default Modal;

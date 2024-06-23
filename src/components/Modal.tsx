import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import type { MutableRefObject, ReactNode } from 'react';
import { MdOutlineClose } from 'react-icons/md';
type Props = {
	isOpen: boolean;
	onCloseModal: () => void;
	title: ReactNode;
	children: ReactNode;
	focusRef?: MutableRefObject<HTMLElement | null>;
	description?: string;
	image?: string;
};
function Modal({ isOpen, image, onCloseModal, ...props }: Props) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				open={isOpen}
				as="div"
				onClose={onCloseModal}
				className="relative z-50"
				initialFocus={props.focusRef}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-700"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[250px] dark:bg-neutral-700/5">
						<Image
							src={image as string}
							alt="bg"
							className={`h-auto w-full object-cover blur-lg backdrop-blur-[250px] transition duration-700`}
							loading="lazy"
							width={0}
							height={0}
							decoding="async"
						/>
					</Dialog.Overlay>
				</Transition.Child>
				<div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto p-4">
					<Dialog.Panel className="w-full max-w-xl rounded">
						<div className="w-full">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-75"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-700"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="relative z-50 my-8 inline-block w-full max-w-xl overflow-hidden rounded-2xl bg-neutral-200 p-6 text-left align-middle shadow-lg shadow-neutral-600/50 transition-all dark:bg-neutral-200">
									<div className="relative">
										<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[#1DB954]">
											{props.title}
										</Dialog.Title>

										<div className="absolute right-0 top-0 text-xl">
											<button
												type="button"
												className="rounded-full p-2 leading-none hover:bg-slate-500/40 hover:delay-200 dark:text-black"
												onClick={onCloseModal}
											>
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
				</div>
			</Dialog>
		</Transition>
	);
}

export default Modal;

import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import type { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	title: ReactNode;
	children: ReactNode;
	focusRef?: MutableRefObject<HTMLElement | null>;
	description?: string;
};
function Modal({ isOpen, ...props }: Props) {
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
							<Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[250px] dark:bg-neutral-700/5" />
						</Transition.Child>

						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-400"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-600"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="relative z-99 my-8 inline-block w-full max-w-xl
							 overflow-hidden rounded-2xl bg-neutral-200 p-6 text-left align-middle shadow-xl
							  transition-all dark:bg-neutral-200">
								<div className="relative">
									<Dialog.Title as="h3" className="text-lg text-[#1DB954] font-medium leading-6">
										{props.title}
									</Dialog.Title>

									<div className="absolute top-0 right-0 text-xl">
										<button type="button"
										className="leading-none px-3 py-1" onClick={close}>
											&times;
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

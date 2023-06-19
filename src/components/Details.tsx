import type { ReactNode } from 'react';

type DetailProps = {
	details: Array<{ name: string; value: ReactNode }>;
};

function Details(props: DetailProps) {
	return (
		<div className="space-y-1.5">
			{props.details.map((detail) => (
				<div key={detail.name} className="flex ">
					<h1 className="basis-[40%] truncate font-sans text-sm font-bold uppercase text-neutral-600 dark:text-neutral-500 md:basis-1/5">
						{detail.name}
					</h1>

					<h1 className="basis-full truncate font-mono text-sm text-neutral-500 dark:text-neutral-400">
						{detail.value}
					</h1>
				</div>
			))}
		</div>
	);
}

export default Details;

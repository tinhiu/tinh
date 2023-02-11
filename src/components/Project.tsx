
const Project = ({url, title, description}: {url: string, title: string, description: string}) => {
  return (
    <div className="group relative flex">
      <div className="absolute -inset-0.5 rounded-lg opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100"></div>
      <div className="absolute -inset-0.5 rounded-lg opacity-0 blur-sm transition-all duration-700 ease-in-out group-hover:opacity-100"></div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full"
      >
        <button className="relative w-full rounded-lg border border-gray-700 dark:border-gray-100 bg-transparent px-7 py-6 transition-all duration-700 ease-in-out group-hover:bg-slate-400">
          <span className="mb-3 block text-left font-semibold text-black dark:text-white">
            {title}
          </span>
          <span className="block text-left text-sm text-gray-700 dark:text-white">
            {description}
          </span>
         
        </button>
      </a>
    </div>
  );
}

export default Project;

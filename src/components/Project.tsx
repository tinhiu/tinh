import { IconType } from "react-icons";
import {
  Tooltip,
} from 'react-tippy';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiExpress

} from "react-icons/si";
import 'react-tippy/dist/tippy.css'
interface TechProps {
  name: string;
  icon: IconType;
}
const projects = [
  {
    title: "🌟 tinh \u2197",
    description: "My personal website",
    url: "",
    techs: [
      {
        name: 'Typescript',
        icon: SiTypescript
      }, {
        name: 'Nextjs',
        icon: SiNextdotjs
      }, {
        name: 'Tailwind',
        icon: SiTailwindcss
      }
    ]
  }, {
    title: "🌟 loc mobile \u2197",
    description: "An ecommerce app build with MERN STACK",
    url: "",
    techs: [
      {
        name: 'Mongodb',
        icon: SiMongodb
      }, {
        name: 'Express',
        icon: SiExpress
      }, {
        name: 'React',
        icon: SiReact
      }, {
        name: 'Nodejs',
        icon: SiNodedotjs
      }
    ]
  }
];
export const TechItem = ({ name, icon }: TechProps) => {
  return (
    <Tooltip title={name} position={"top"} duration={250} arrow={true}>
      <span>{icon({ className: "h-6 w-6 mr-6" })}</span>
    </Tooltip>
  );
};

const Project = () => {
  return (
    projects.map((prj, index) => (
      <div className="group relative flex" key={index}>
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-t from-violet-400 to-amber-300 opacity-0 blur-sm transition-all duration-700 ease-in-out group-hover:opacity-100"></div>
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-t from-violet-400 to-amber-300 opacity-0 blur-sm transition-all duration-700 ease-in-out group-hover:opacity-100"></div>
        <a
          href={prj.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full"
        >
          <button className="relative w-full space-y-3 rounded-lg border border-gray-700/50 bg-gray-300 px-7 py-6 transition-all duration-700 ease-in-out group-hover:bg-slate-400/70 dark:border-gray-100 dark:bg-[#5f5555ad] dark:group-hover:bg-red-400/30">
            <span className=" block border-b-[2px] border-gray-500/60 text-left font-semibold text-black dark:border-neutral-400 dark:text-white">
              {prj.title}
            </span>
            <span className="block text-left text-sm text-gray-700 dark:text-white">
              {prj.description}
            </span>
            <span className="block text-left text-sm text-gray-700 dark:text-white">
              <div className="flex items-center justify-start">
                {prj.techs.map((item, index) => (
                  <TechItem key={index} name={item.name} icon={item.icon} />
                ))}
              </div>
            </span>
          </button>
        </a>
      </div>
    ))
  );
}

export default Project;

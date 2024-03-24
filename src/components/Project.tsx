import { IconType } from "react-icons";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiExpress

} from "react-icons/si";
import { FaGithub } from 'react-icons/fa';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
interface TechProps {
  name: string;
  icon: IconType;
}
const projects = [
  {
    title: "🌟 loc mobile \u2197",
    description: "An ecommerce app build with MERN STACK",
    url: "https://dntn-frontend.onrender.com/",
    git: "https://github.com/tinhiu/ecommerce",
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
  },
  {
    title: "🌟 tinh \u2197",
    description: "My personal website",
    url: "https://tinh-website.vercel.app/",
    git: "https://github.com/tinhiu/tinh",
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
  },
  {
    title: "🌟 pokedex \u2197",
    description: "Pokedex using PokeAPI get list pokemon",
    url: "https://pokedex-nxt13.vercel.app/",
    git: "https://github.com/tinhiu/pokedex",
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
  },
  {
    title: "🌟 tumblr profile \u2197",
    description: "Web app get profile information of Tumblr",
    url: "https://tumblr-next.vercel.app/",
    git: "https://github.com/tinhiu/tumblr-next",
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
  },
];

export const TechItem = ({ name, icon }: TechProps) => {
  return (
    <Tippy delay={[0, 10]}
      content={name}
      placement="bottom">
      <span>{icon({ className: "h-6 w-6" })}</span>
    </Tippy >
  );
};

const Project = (): JSX.Element => {
  return (
    <>
      {projects.map((prj, index) => {
        return (
          <div className="group relative flex" key={index}>
            <div className="flex w-full">
              <div className="relative w-full space-y-3 rounded-lg border border-gray-700/50 bg-gray-300 px-7 py-6 transition-all duration-700 ease-in-out group-hover:bg-slate-400/70 dark:border-gray-100 dark:bg-[#5f5555ad] dark:group-hover:bg-red-400/30">
                <div className="flex justify-between">
                  <a href={prj.url} target="_blank" rel="noopener noreferrer">
                    <span className="block rounded-sm border-b-[2px] border-gray-500/60 pr-2 text-left font-semibold text-black hover:bg-white/50 dark:border-neutral-400 dark:text-white">
                      {prj.title}
                    </span>
                  </a>
                  <a href={prj.git} target="_blank" rel="noopener noreferrer" className="h-6 w-6 hover:underline" >
                    <TechItem name="Github" icon={FaGithub} />
                  </a>
                </div>
                <span className="block text-left text-sm text-gray-700 dark:text-white">
                  {prj.description}
                </span>
                <span className="block text-left text-sm text-gray-700 dark:text-white">
                  <div className="flex items-center justify-start">
                    {prj.techs.map((item, index) => (
                      <span className="mr-6" key={index} >
                        <TechItem name={item.name} icon={item.icon} />
                      </span>
                    ))}
                  </div>
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
}

export default Project;

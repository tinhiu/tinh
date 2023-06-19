import { IconType } from "react-icons";
import {
  SiNodedotjs,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiCss3,
  SiHtml5,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiGit,
  SiTailwindcss,
  SiMongodb,
  SiCsharp
} from "react-icons/si";
import { DiJava } from "react-icons/di"
import { GrMysql } from "react-icons/gr";

const Icon = ({ name, _icon }: { name: string; _icon: IconType }) => {
  return (
    <div className="flex items-center space-x-2 rounded-md border border-white/20 bg-white/60 p-3 dark:bg-[#5f5555ad]">
      <_icon className="h-6 w-6 text-neutral-600 dark:text-white/75" />
      <p className="text-neutral-600 dark:text-white/75">{name}</p>
    </div>
  );
};

const Technologies = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <Icon name="C++" _icon={SiCplusplus} />
      <Icon name="C#" _icon={SiCsharp} />
      <Icon name="php" _icon={SiPhp} />
      <Icon name="HTML" _icon={SiHtml5} />
      <Icon name="CSS" _icon={SiCss3} />
      <Icon name="Javascript" _icon={SiJavascript} />
      <Icon name="Java" _icon={DiJava} />
      <Icon name="Typescript" _icon={SiTypescript} />
      <Icon name="Tailwind CSS" _icon={SiTailwindcss} />
      <Icon name="MySQL" _icon={GrMysql} />
      <Icon name="MongoDB" _icon={SiMongodb} />
      <Icon name="Node.js" _icon={SiNodedotjs} />
      <Icon name="React.js" _icon={SiReact} />
      <Icon name="Next.js" _icon={SiNextdotjs} />
      <Icon name="Git" _icon={SiGit} />
    </div>
  );
};

export default Technologies;

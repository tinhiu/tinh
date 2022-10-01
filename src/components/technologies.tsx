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
  SiJava,
  SiCsharp
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";

const Item = ({ name, _icon }: { name: string; _icon: IconType }) => {
  return (
    <div className="flex items-center space-x-2 rounded-md border border-white/20 bg-white/60 dark:bg-[#5f5555ad] p-3">
      <_icon className="h-6 w-6 text-neutral-600 dark:text-white/75" />
      <p className="text-neutral-600 dark:text-white/75">{name}</p>
    </div>
  );
};

const Technologies = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <Item name="C++" _icon={SiCplusplus} />
      <Item name="C#" _icon={SiCsharp} />
      <Item name="php" _icon={SiPhp} />
      <Item name="Java" _icon={SiJava} />
      <Item name="HTML" _icon={SiHtml5} />
      <Item name="CSS" _icon={SiCss3} />
      <Item name="Javascript" _icon={SiJavascript} />
      <Item name="Typescript" _icon={SiTypescript} />
      <Item name="Tailwind CSS" _icon={SiTailwindcss} />
      <Item name="MySQL" _icon={GrMysql} />
      <Item name="MongoDB" _icon={SiMongodb} />
      <Item name="Node.js" _icon={SiNodedotjs} />
      <Item name="React.js" _icon={SiReact} />
      <Item name="Next.js" _icon={SiNextdotjs} />
      <Item name="Git" _icon={SiGit} />
    </div>
  );
};

export default Technologies;

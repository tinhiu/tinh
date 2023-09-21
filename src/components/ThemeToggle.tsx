import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        let storedTheme = localStorage.getItem("theme") as string;

        if (!storedTheme) {
            localStorage.setItem("theme", theme);
        } else {
            setTheme(storedTheme);
            storedTheme === "dark" ? document.querySelector("html")?.classList.add("dark") : null;
        }
    }, [theme]);

    const changeTheme = (theme: string) => {
        let newTheme = theme === "light" ? "dark" : "light";

        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        newTheme === "light"
            ? document.querySelector("html")?.classList.remove("dark")
            : document.querySelector("html")?.classList.add("dark");
    };

    return (
        <button
            className="cursor-pointer rounded-full p-2 hover:border-violet-700/60 hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() => changeTheme(theme)}
        >
            {theme === "light" && <FiSun className="h-6 w-6 text-stone-600" />}
            {theme === "dark" && <FiMoon className="h-6 w-6 text-white/80" />}
        </button>
    );
};

export default ThemeToggle;

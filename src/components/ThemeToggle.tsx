import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        let storedTheme = localStorage.getItem("theme") as string;

        if (!storedTheme) {
            localStorage.setItem("theme", theme);
            document.querySelector("html")?.setAttribute("data-mode", theme);
        } else {
            setTheme(storedTheme);
            storedTheme === "light" ? document.querySelector("html")?.setAttribute("data-mode", 'light')
            : document.querySelector("html")?.setAttribute("data-mode", 'dark');
        }
    }, [theme]);

    const changeTheme = (theme: string) => {
        let newTheme = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        document.querySelector('#theme-toggle')?.setAttribute('aria-label', newTheme)
    };

    return (
        <button
            className="theme-toggle cursor-pointer rounded-full p-2 hover:border-violet-700/60 hover:bg-black/5 dark:hover:bg-white/5"
            id="theme-toggle" title="Toggles light & dark" aria-label="auto" aria-live="polite"
            onClick={() => changeTheme(theme)}>
            <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                <mask className="moon" id="moon-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <circle cx="24" cy="10" r="6" fill="black" />
                </mask>
                <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                <g className="sun-beams" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
            </svg>
        </button>
    );
};

export default ThemeToggle;

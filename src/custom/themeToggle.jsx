import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "auto");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.setAttribute("data-theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
      }
    }
  }, [theme]);

  return (
    <div className="flex gap-2 p-4">
      <button
        onClick={() => setTheme("light")}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        ☀️ Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        🌙 Dark
      </button>
      <button
        onClick={() => setTheme("auto")}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        🔄 Auto
      </button>
    </div>
  );
};

export default ThemeToggle;

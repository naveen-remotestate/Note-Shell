import { useEffect } from "react";
import MoonIcon from "../assets/MoonIcon";
import SunIcon from "../assets/SunIcon";

export default function ToggleTheme() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggleTheme() {
    const doc = document.documentElement;

    if (doc.classList.contains("dark")) {
      doc.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      doc.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <div
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 cursor-pointer"
    >
      <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-neutral-900 dark:translate-x-7 transition-all flex items-center justify-center">
        <SunIcon />
        <MoonIcon />
      </div>
    </div>
  );
}

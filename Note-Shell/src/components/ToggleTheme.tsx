import MoonIcon from "../assets/MoonIcon";
import SunIcon from "../assets/SunIcon";

export default function ToggleTheme() {
  return (
    <div
      onClick={() => document.documentElement.classList.toggle("dark")}
      className="
        relative w-14 h-7
        rounded-full
        bg-neutral-200 dark:bg-neutral-800
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
      "
    >
      <div
        className="
          absolute top-1 left-1
          w-5 h-5
          rounded-full
          bg-white dark:bg-neutral-900
          shadow-md
          transition-all duration-300 ease-in-out
          dark:translate-x-7
          flex items-center justify-center
        "
      >
        <SunIcon />
        <MoonIcon />
      </div>
    </div>
  );
}

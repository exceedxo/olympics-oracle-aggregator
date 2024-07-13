import { FaGithub } from "react-icons/fa";
import { useSettingsStore } from "@/stores";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {

    const { isDarkMode, updateIsDarkMode } = useSettingsStore();

    return (
        <div className={`${isDarkMode ? "bg-primary text-primary border-primary" : "bg-light text-light border-light"} h-24 flex items-center lg:px-24 px-8 border-b-2 justify-between`}>
            <div className="flex items-center">
                <img src="/logo.svg" alt="logo" className="h-12 mr-4" />
                <h1 className="text-2xl font-bold max-sm:hidden">Oracle Aggregator</h1>
            </div>
            <div className="flex items-center gap-8">
                {isDarkMode ? (
                    <FaSun className="text-4xl cursor-pointer" onClick={() => updateIsDarkMode(false)} />
                ) : (
                    <FaMoon className="text-4xl cursor-pointer" onClick={() => updateIsDarkMode(true)} />
                )}
                <a href="https://github.com/exceedxo/olympics-oracle-aggregator" target="_blank" className="flex items-center">
                    <FaGithub className="text-4xl" />
                </a>
            </div>
        </div>
    );
}

export default Header;

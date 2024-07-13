import { useSettingsStore } from "@/stores";

function Footer() {

    const { isDarkMode } = useSettingsStore();

    return (
        <div className={`${isDarkMode ? "bg-primary text-primary" : "bg-light text-light"} h-24 flex px-8 sm:px-16 lg:justify-end justify-center items-center`}>
            <p className="text-center text-sm">Made with ❤️ by <a href="https://x.com/exceedxo" target="_blank" className="underline">Exceed</a></p>
        </div>
    );
}

export default Footer;

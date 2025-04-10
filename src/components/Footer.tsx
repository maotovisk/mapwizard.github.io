import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md py-6 text-center text-gray-600 dark:text-gray-300 rounded-t-2xl border-t border-white/30 dark:border-gray-500/20">
            <p>
                {t('footer.copyright').replace("{year}", new Date().getFullYear().toString())}{" "}
                <a href="https://osu.ppy.sh/users/maot">maot</a>
            </p>
        </footer>
    );
}

import { useLanguage } from "../contexts/LanguageContext";
import Card from './ui/Card';

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="mb-16">
            <h3 className="mb-4 text-2xl font-semibold text-center">
                {t('about.title')}
            </h3>
            <Card>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {t('about.description')} <br />
                    <span className="font-weight-bold">
                        {t('about.goal')}
                    </span>
                </p>
            </Card>
        </section>
    );
}

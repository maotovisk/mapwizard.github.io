import { useLanguage } from "../contexts/LanguageContext";
import Card from './ui/Card';

export default function Features() {
    const { t } = useLanguage();

    return (
        <section id="features" className="mb-16">
            <h3 className="mb-6 text-2xl font-semibold text-center">{t('features.title')}</h3>
            <div className="grid gap-8 md:grid-cols-3">
                <Card>
                    <h4 className="mb-2 text-xl font-bold">{t('features.hitsoundCopier.title')}</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        {t('features.hitsoundCopier.description')}
                    </p>
                </Card>
                <Card label={t('label.new')} labelColor="new">
                    <h4 className="mb-2 text-xl font-bold">{t('features.metadataManager.title')}</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        {t('features.metadataManager.description')}
                    </p>
                </Card>
                <Card label={t('label.soon')}>
                    <h4 className="mb-2 text-xl font-bold">{t('features.comboColourStudio.title')}</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        {t('features.comboColourStudio.description')}
                    </p>
                </Card>
            </div>
        </section>
    );
}

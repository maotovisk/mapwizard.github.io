import Card from './ui/Card';

export default function About() {
    return (
        <section id="about" className="mb-16">
            <h3 className="text-2xl font-semibold mb-4 text-center">
                About the project
            </h3>
            <Card>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    MapWizard is a cross-platform open-source project aimed at providing
                    mappers with powerful tools to enhance their workflow. It was
                    developed initially as a necessity for those osu! mapping tools on
                    Linux. <br />
                    <span className="font-weight-bold">
                        Our goal is to make mapping easier and more efficient for
                        everyone.
                    </span>
                </p>
            </Card>
        </section>
    );
}

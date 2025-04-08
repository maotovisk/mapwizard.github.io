import Card from './ui/Card';

export default function Features() {
    return (
        <section id="features" className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
                <Card>
                    <h4 className="text-xl font-bold mb-2">Hitsound Copier</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        Easily copy hitsounds between beatmaps to maintain consistent
                        sound design.
                    </p>
                </Card>
                <Card label="NEW" labelColor="new">
                    <h4 className="text-xl font-bold mb-2">Metadata Manager</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        Quickly edit and standardize map metadata like title and artist.
                    </p>
                </Card>
                <Card label="SOON">
                    <h4 className="text-xl font-bold mb-2">Combo Colour Studio</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        Craft the perfect color combos for your maps.
                    </p>
                </Card>

            </div>
        </section>
    );
}

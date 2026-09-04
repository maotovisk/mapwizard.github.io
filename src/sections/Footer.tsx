export default function Footer() {
    return (
        <footer class="foot">
            <p class="foot__line">Now go map something.</p>
            <div class="foot__meta">
                <span class="foot__brand">
                    <img src="/img/app-icon.png" alt="" width={20} height={20} />
                    <a
                        href="#top"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        MapWizard
                    </a>
                </span>
                <span>
                    MIT · free forever ·{' '}
                    <a href="https://github.com/maotovisk/MapWizard" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    {' '}· made by{' '}
                    <a href="https://github.com/maotovisk" target="_blank" rel="noopener noreferrer">
                        maotovisk
                    </a>{' '}
                    &amp; contributors
                </span>
            </div>
        </footer>
    );
}

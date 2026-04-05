import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-dark text-white/70 mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.jpg" alt="Paredes" className="h-9 w-9 rounded-lg object-contain" />
              <span className="text-lg font-bold text-white tracking-tight">
                PAREDES
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Distributeur exclusif des produits Paredes en Tunisie. Solutions
              d&apos;hygiène et d&apos;entretien professionnel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/produits"
                  className="text-sm hover:text-white transition-colors"
                >
                  Produits
                </a>
              </li>
              <li>
                <a
                  href="/offres"
                  className="text-sm hover:text-white transition-colors"
                >
                  Offres &amp; Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>Tunisie</li>
              <li>
                <span className="text-white/50">Paiement :</span> À la
                livraison
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100075623007069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Paredes Tunisie sur Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>&copy; {currentYear} Paredes Tunisie. Tous droits réservés.</p>
          <p>
            Marque Paredes &mdash;{" "}
            <a
              href="https://www.paredes.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              paredes.fr
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

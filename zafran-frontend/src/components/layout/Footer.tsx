import { Link } from 'react-router-dom';
import zafranLogo from '../../assets/zafran-logo.png';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="footer" role="contentinfo">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2 logo">
            <Link to="/" className="flex items-center logo-img">
              <img
                  src={zafranLogo}
                  alt="Zafran - Retour à l'accueil"
                  className="logo-img"
                  width="200"
                  height="50"
              />
            </Link>
            <p className="description">
              Expérience authentique de la gastronomie marocaine, proposant des services de traiteur,
              des événements culinaires et des cours de cuisine.
            </p>
            <div className="social-links flex space-x-4 mt-4">
              <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Notre page Facebook (nouvelle fenêtre)"
              >
                <i className="fab fa-facebook-f" aria-hidden="true"></i> Facebook
              </a>
              <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Notre compte Instagram (nouvelle fenêtre)"
              >
                <i className="fab fa-instagram" aria-hidden="true"></i> Instagram
              </a>
              <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Notre compte Twitter (nouvelle fenêtre)"
              >
                <i className="fab fa-twitter" aria-hidden="true"></i> Twitter
              </a>
            </div>
          </div>

          {/* Liens */}
          <nav className="col-span-1" aria-label="Navigation secondaire">
            <h3 className="footer-link-title">Navigation</h3>
            <ul className="footer-quick-links space-y-3">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="footer-link-title">Contact</h3>
            <address className="not-italic">
              <p>Rue Douar Chikh Lamfadel, Résidence Zafran, Appt 12, Salé 10120</p>
              <p><a href="mailto:contact@zafran.ma">contact@zafran.ma</a></p>
              <p><a href="tel:+212 6 56 15 93 93">+212 6 56 15 93 93</a></p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="copyright">
              &copy; {currentYear} Zafran. <span>Tous droits réservés.</span>
            </p>
            <nav className="mt-4 md:mt-0 flex space-x-6 footer-quick-links" aria-label="Liens juridiques">
              <Link to="/privacy">Politique de confidentialité</Link>
              <Link to="/terms">Conditions d'utilisation</Link>
            </nav>
          </div>
        </div>
      </footer>
  );
}
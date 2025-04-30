import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import cuisin from '../../assets/Cuisine-Marocaine.png';

export function Hero() {
  return (
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
              className="w-full h-full bg-cover bg-center bg-no-repeat animate-zoom-bg"
              style={{ backgroundImage: `url(${cuisin})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 to-gray-950/90"></div>
          </div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 moroccan-pattern"></div>

        {/* Content */}
        <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center px-4">
        <span className="inline-block py-1 px-4 rounded-full bg-amber-400/20 text-amber-300 font-medium mb-6 animate-fade-in [animation-delay:300ms]">
          Authentic Gastronomy & Catering
        </span>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-5xl mb-6 animate-fade-in [animation-delay:600ms]">
            <span className="text-amber-400">L'Art Gastronomique</span> Marocain à Votre Service
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl mb-10 animate-fade-in [animation-delay:900ms]">
            Découvrez l'authenticité des saveurs marocaines avec nos services de traiteur et événements culinaires d'exception.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:1200ms]">
            <Link to="/services" className="btn-primary">
              Nos Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline text-white border-white hover:bg-white/20 hover:text-white">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
  );
}
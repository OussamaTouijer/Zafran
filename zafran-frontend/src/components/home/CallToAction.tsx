import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CallToAction() {
  return (
      <section
          className="py-20 bg-gradient-to-br from-zafran-500 to-spice-600 text-white moroccan-pattern"
          aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4 text-center">
          <h2
              id="cta-heading"
              className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Prêt à vivre l&apos;expérience Zafran&nbsp;?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Contactez-nous dès maintenant pour discuter de votre projet culinaire et recevoir une proposition sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
                to="/contact"
                className="btn-primary flex items-center justify-center gap-2 bg-white text-zafran-600 hover:bg-white/90 transition-colors duration-300 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl"
                aria-label="Contactez-nous (ouvre la page de contact)"
            >
              Contactez-nous
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
                to="/services"
                className="btn-outline border-2 border-white text-white hover:bg-white/10 transition-colors duration-300 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl"
                aria-label="Découvrir nos services (ouvre la page des services)"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>
  );
}
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import zafranLogo from '../../assets/zafran-logo.png';

export function AboutPreview() {
  return (
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="section-title mb-6">Notre Histoire</h2>
              <p className="text-gray-700 mb-6">
                Fondée en 2015 par le Chef Oussama Touijer, Zafran est née d’une volonté de sublimer la cuisine marocaine à travers une plateforme moderne et accessible. Après plus de 15 ans d'expérience dans des restaurants étoilés en France et à l’international, le Chef a voulu créer un lien entre tradition et innovation, entre les saveurs ancestrales du Maroc et les exigences d’une gastronomie contemporaine.
              </p>
              <p className="text-gray-700 mb-8">
                Zafran, nom inspiré de l’épice la plus noble et la plus emblématique du royaume, symbolise la richesse, la finesse et l’authenticité. Comme le safran, chaque plat que nous proposons est rare, précieux et travaillé avec passion.
              </p>
              <Link to="/about" className="btn-primary">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                      src={zafranLogo}
                      alt="Logo de Zafran"
                      className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
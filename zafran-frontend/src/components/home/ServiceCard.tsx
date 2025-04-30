import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  slug: string;
  imageUrl?: string;
  delay?: number;
}

export function ServiceCard({ id, title, description, price, category, slug, imageUrl, delay = 0 }: ServiceCardProps) {
  const apiUrl = 'http://localhost:1337';

  return (
      <div
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full animate-fade-in"
          style={{ animationDelay: `${delay}ms` }}
      >
        {/* Image display */}
        <div className="h-48 bg-gradient-to-br from-zafran-300 to-spice-500 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
              <img
                  src={`${apiUrl}${imageUrl}`}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback pour les images qui ne se chargent pas
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                    const iconDiv = document.createElement('div');
                    iconDiv.className = 'w-16 h-16 bg-white/20 rounded-full flex items-center justify-center';
                    e.currentTarget.parentElement!.appendChild(iconDiv);
                  }}
              />
          ) : (
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                {category === 'Événements' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                )}
                {category === 'Traiteur' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                )}
                {category === 'Cours' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                )}
              </div>
          )}
        </div>

        <div className="p-6 flex-grow">
          <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-zafran-100 text-zafran-700 text-xs font-medium rounded">
            {category}
          </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-clay-900 mb-2">{title}</h3>
          <p className="text-clay-600 mb-4 line-clamp-3">{description}</p>
        </div>

        <div className="p-6 pt-0 mt-auto">
          <div className="flex justify-between items-center">
          <span className="text-zafran-500 font-bold">
            {price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </span>
            <Link
                to={`/services/${slug}`}
                className="text-spice-600 font-medium hover:text-spice-800 transition-colors duration-200"
            >
              Détails →
            </Link>
          </div>
        </div>
      </div>
  );
}

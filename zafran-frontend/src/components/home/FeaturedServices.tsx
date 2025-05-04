import { useServices } from '@/services/api';
import { toast } from '@/components/ui/sonner';
import { useEffect, useState } from 'react';
import { CardServiceSkeleton } from '@/components/home/CardServiceSkeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import {CardService} from "@/components/home/CardService.tsx";

export function FeaturedServices() {
  const { data: servicesData, isLoading, error, refetch } = useServices();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error('Erreur lors du chargement des services');
      console.error('Error fetching services:', error);
    }
  }, [error]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const services = servicesData?.data ?? [];

  return (
      <section
          className="py-20 bg-muted moroccan-pattern"
          aria-labelledby="featured-services-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-16 space-y-6">
            <h2
                id="featured-services-heading"
                className="section-title mb-6"
            >
              Nos Services Gastronomiques
            </h2>
            <p className="section-subtitle">
              Découvrez notre gamme de prestations culinaires marocaines, adaptées à vos besoins et événements.
            </p>


          </div>

          {error ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-red-500">Échec du chargement des services</p>
                <Button onClick={handleRefresh}>Réessayer</Button>
              </div>
          ) : isLoading || isRefreshing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                    <CardServiceSkeleton key={index} />
                ))}
              </div>
          ) : services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <CardService
                        key={service.id}
                        id={service.id}
                        title={service.title}
                        description={getDescriptionText(service.description)}
                        category={service.categor} // Correction de la typo 'categor' à 'category'
                        slug={service.slug}
                        imageUrl={service.image?.url}
                        delay={index * 150}
                    />
                ))}
              </div>
          ) : (
              <div className="text-center py-12 space-y-4">
                <p className="text-gray-600">Aucun service disponible pour le moment</p>
                <Button onClick={handleRefresh}>Recharger</Button>
              </div>
          )}
        </div>
      </section>
  );
}

function getDescriptionText(description: unknown): string {
  if (!description) return '';

  if (Array.isArray(description)) {
    const firstBlock = description[0];
    if (firstBlock?.children) {
      return firstBlock.children
          .filter(child => child.text)
          .map(child => child.text)
          .join(' ');
    }
    return '';
  }

  return typeof description === 'string' ? description : '';
}
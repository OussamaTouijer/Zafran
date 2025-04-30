
import { ServiceCard } from '@/components/home/ServiceCard';
import { useServices, Service } from '@/services/api';
import { toast } from '@/components/ui/sonner';
import { useEffect } from 'react';

export function FeaturedServices() {
  const { data: servicesData, isLoading, error } = useServices();
  
  useEffect(() => {
    if (error) {
      toast.error("Erreur lors du chargement des services");
      console.error("Error fetching services:", error);
    }
  }, [error]);
  
  // Utilisez les données mockées si les données API ne sont pas disponibles
  const services = servicesData?.data || [];

  return (
    <section className="py-20 bg-muted moroccan-pattern">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title mb-6">Nos Services Gastronomiques</h2>
          <p className="section-subtitle">
            Découvrez notre gamme de prestations culinaires marocaines, adaptées à vos besoins et événements.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zafran-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={getDescriptionText(service.description)}
                price={service.price}
                category={service.categor}
                slug={service.slug}
                delay={index * 150}
              />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a href="/services" className="btn-outline">
            Voir tous nos services
          </a>
        </div>
      </div>
    </section>
  );
}

// Fonction utilitaire pour extraire le texte de description
function getDescriptionText(description: any): string {
  if (!description) return "";
  
  if (Array.isArray(description) && description.length > 0) {
    const paragraph = description[0];
    if (paragraph && paragraph.children && paragraph.children.length > 0) {
      return paragraph.children[0].text;
    }
  }
  
  return typeof description === 'string' ? description : "";
}

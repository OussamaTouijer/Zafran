
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useServices } from '@/services/api';
import { ServiceCard } from '@/components/home/ServiceCard';
import { toast } from '@/components/ui/sonner';
import { useEffect } from 'react';

const Services = () => {
  const { data: servicesData, isLoading, error } = useServices();
  
  useEffect(() => {
    if (error) {
      toast.error("Erreur lors du chargement des services");
      console.error("Error fetching services:", error);
    }
  }, [error]);
  
  const services = servicesData?.data || [];

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h1 className="section-title mb-6">Nos Services</h1>
              <p className="section-subtitle">
                Découvrez l'ensemble de nos prestations gastronomiques marocaines
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zafran-500"></div>
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    description={getDescriptionText(service.description)}
                    price={service.price}
                    category={service.categor}
                    slug={service.slug}
                    delay={index * 100}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p>Aucun service disponible pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

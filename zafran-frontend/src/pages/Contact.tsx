
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useContact } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import { useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { data: contactData, isLoading, error } = useContact();

  useEffect(() => {
    if (error) {
      toast.error("Erreur lors du chargement des informations de contact");
      console.error("Error fetching contact data:", error);
    }
  }, [error]);

  const contactInfo = contactData?.data || {};

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h1 className="section-title mb-6">Contactez-nous</h1>
              <p className="section-subtitle">
                Nous sommes à votre disposition pour toute demande d'information
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zafran-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-serif font-bold mb-6 text-clay-800">Envoyez-nous un message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-clay-700 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full p-3 border border-clay-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zafran-500"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-clay-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full p-3 border border-clay-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zafran-500"
                          placeholder="Votre email"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-clay-700 mb-1">
                        Sujet
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full p-3 border border-clay-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zafran-500"
                        placeholder="Sujet de votre message"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-clay-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full p-3 border border-clay-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zafran-500"
                        placeholder="Votre message"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-zafran-500 text-white py-3 px-6 rounded-md hover:bg-zafran-600 transition-colors font-medium"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>

                <div className="flex flex-col space-y-8">
                  <div className="bg-clay-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-serif font-bold mb-6 text-clay-800">Informations de contact</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-zafran-500 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium text-clay-800">Adresse</h3>
                          <p className="text-clay-600">{contactInfo.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-6 w-6 text-zafran-500 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium text-clay-800">Email</h3>
                          <p className="text-clay-600">{contactInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-6 w-6 text-zafran-500 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium text-clay-800">Téléphone</h3>
                          <p className="text-clay-600">{contactInfo.tele}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-clay-50 p-8 rounded-lg h-64">
                    {/* Ici, nous pourrions intégrer une carte OpenStreetMap ou Google Maps */}
                    <div className="w-full h-full bg-clay-200 rounded-lg flex items-center justify-center">
                      <span className="text-clay-600">Carte interactive</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAbout } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import { useEffect } from "react";

const About = () => {
    const { data: aboutData, isLoading, error } = useAbout();

    useEffect(() => {
        if (error) {
            toast.error("Erreur lors du chargement des informations");
            console.error("Error fetching about data:", error);
        }
    }, [error]);

    const historyItems = aboutData?.data?.history || [];
    const teamMembers = aboutData?.data?.team || [];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main>
                <section className="py-20 bg-white">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h1 className="section-title mb-6">À propos de nous</h1>
                            <div className="w-20 h-1 bg-zafran-500 mx-auto"></div>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zafran-500"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                {/* Équipe */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-clay-800 mb-2">Notre Équipe</h2>
                                    <p className="text-clay-600 mb-6">Les artisans derrière chaque expérience unique chez Zafran</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                        {teamMembers.map((member) => (
                                            <div key={member.id} className="text-center">
                                                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow">
                                                    <img
                                                        src={
                                                            member.image?.[0]?.formats?.thumbnail?.url
                                                                ? `http://localhost:1337${member.image[0].formats.thumbnail.url}`
                                                                : "/placeholder.jpg"
                                                        }
                                                        alt={member.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <h3 className="text-lg font-semibold text-clay-800">{member.name}</h3>
                                                <p className="text-sm text-clay-600">{member.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Histoire */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold mb-6 text-clay-800">Notre Histoire</h2>
                                    <div className="prose prose-lg text-clay-700 max-w-none">
                                        {historyItems.map((item, index) => (
                                            <p key={index} className="mb-4">
                                                {item.children.map((child, i) => {
                                                    let text = child.text;

                                                    if (child.bold && child.italic) {
                                                        return <strong key={i}><em>{text}</em></strong>;
                                                    } else if (child.bold) {
                                                        return <strong key={i}>{text}</strong>;
                                                    } else if (child.italic) {
                                                        return <em key={i}>{text}</em>;
                                                    } else {
                                                        return <span key={i}>{text}</span>;
                                                    }
                                                })}
                                            </p>
                                        ))}
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

export default About;

import MainLayout from '@/Layouts/MainLayout';
import PremiumHeroSlider from '@/Components/PremiumHeroSlider';
import { ServicesCarousel } from '@/Components/ServicesCarousel';
import { MagneticButton } from '@/Components/MagneticButton';
import { AfricaMapAnimation } from '@/Components/AfricaMapAnimation';
import { CheckCircle, Star, Download, Send, Users, Globe, Clock, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const aeroportRef = useRef(null);
    const { scrollY } = useScroll();

    const backgroundSize = useTransform(scrollY,
        [600, 1200],   // Démarre à 600px de scroll, finit à 1200px
        ['100% 100%', '120% 120%']  // Zoom de 100% à 120%
    );

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('📤 Données du formulaire:', formData);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || '';
            console.log('🔐 CSRF Token:', csrfToken ? '✅ Présent' : '❌ Absent');

            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });

            console.log('📨 Status réponse:', response.status);
            const data = await response.json();
            console.log('📬 Réponse serveur:', data);

            if (data.success) {
                alert('✅ ' + data.message);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                alert('❌ ' + data.message);
            }
        } catch (error) {
            console.error('❌ Erreur réseau:', error);
            alert('❌ Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
        }
    };

    const whatsappLink = "https://wa.me/237677988929";

    return (
        <MainLayout>
            {/* ==================== PREMIUM HERO SLIDER ==================== */}
            <PremiumHeroSlider />

            {/* ==================== REASSURANCE BAR ==================== */}
            <section className="bg-begros-blue text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <Clock size={32} className="mb-2 text-begros-lightblue" />
                            <h3 className="font-semibold">Assistance 24/7</h3>
                            <p className="text-sm text-gray-200">Support constant</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Globe size={32} className="mb-2 text-begros-lightblue" />
                            <h3 className="font-semibold">Zone CEMAC</h3>
                            <p className="text-sm text-gray-200">Couverture complète</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Users size={32} className="mb-2 text-begros-lightblue" />
                            <h3 className="font-semibold">Équipe Expérimentée</h3>
                            <p className="text-sm text-gray-200">Professionnels agréés</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Shield size={32} className="mb-2 text-begros-lightblue" />
                            <h3 className="font-semibold">Normes Respectées</h3>
                            <p className="text-sm text-gray-200">Certifications actuelles</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== SERVICES CAROUSEL SECTION ==================== */}
            <section id="services" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-begros-darkblue mb-4">
                            Une assistance de vol complète
                        </h2>
                        <p className="text-lg text-gray-600">
                            Services spécialisés pour les opérations aériennes en Afrique
                        </p>
                    </div>
                </div>

                <ServicesCarousel />
            </section>

            {/* ==================== BANNER INTERMÉDIAIRE ==================== */}
            <motion.section
                ref={aeroportRef}
                id="about"
                className="relative py-20 bg-cover bg-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 29, 77, 0.75), rgba(0, 29, 77, 0.75)), url("/images/aeroport.jpg")',
                    backgroundSize,
                }}
            >
                <div className="max-w-4xl mx-auto text-center text-white px-4">
                    <h2 className="text-4xl font-bold mb-4">
                        Basés à Douala, opérationnels dans toute la CEMAC
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Avec nos bureaux stratégiquement situés à Douala et nos opérations couvrant l'ensemble de la région CEMAC, nous sommes prêts à servir vos opérations aériennes.
                    </p>
                    <MagneticButton distance={0.5}>
                        <button className="bg-begros-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition duration-300">
                            Explorer nos régions
                        </button>
                    </MagneticButton>
                </div>
            </motion.section>

            {/* ==================== WHY US SECTION ==================== */}
            <section id="fleet" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Gauche: Carte Afrique Interactive Animée */}
                        <div className="flex justify-center">
                            <div className="bg-begros-darkblue text-white p-8 rounded-lg w-full max-w-md overflow-hidden">
                                <h3 className="text-2xl font-bold mb-6 text-center">ZONE CEMAC</h3>
                                <div className="rounded-lg h-80 overflow-hidden relative bg-gray-800">
                                    <AfricaMapAnimation />
                                </div>
                            </div>
                        </div>

                        {/* Droite: Bullet points */}
                        <div>
                            <h2 className="text-4xl font-bold text-begros-darkblue mb-8">
                                Là où d'autres improvisent, nous livrons
                            </h2>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <CheckCircle size={24} className="text-begros-orange flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-begros-darkblue mb-2">Expertise locale</h4>
                                        <p className="text-gray-600">
                                            Connaissance approfondie des réglementations et procédures régionales
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <CheckCircle size={24} className="text-begros-orange flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-begros-darkblue mb-2">Réactivité garantie</h4>
                                        <p className="text-gray-600">
                                            Response rapide et coordination efficace pour tous vos besoins opérationnels
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <CheckCircle size={24} className="text-begros-orange flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-begros-darkblue mb-2">Personnel certifié</h4>
                                        <p className="text-gray-600">
                                            Équipe formée et agréée selon les normes aéronautiques internationales
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-begros-orange bg-opacity-10 border-l-4 border-begros-orange p-6 mt-8">
                                    <p className="text-begros-darkblue font-semibold">
                                        Basés à Douala, services de qualité dans le centre de l'Afrique
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== TESTIMONIALS SECTION ==================== */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-begros-darkblue mb-16">
                        Ce que disent nos clients
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Témoignage 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-begros-orange text-begros-orange" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">
                                "Begro's Group a transformé nos opérations aériennes. Service rapide, professionnel et fiable. Une vraie référence en Afrique de l'Ouest."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-begros-blue rounded-full flex items-center justify-center text-white font-bold">
                                    DK
                                </div>
                                <div>
                                    <p className="font-semibold text-begros-darkblue">David Kameni</p>
                                    <p className="text-sm text-gray-600">Directeur Opérations, Air Cargo Services</p>
                                </div>
                            </div>
                        </div>

                        {/* Témoignage 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-begros-orange text-begros-orange" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">
                                "Un partenaire indispensable pour les opérations en zone CEMAC. Équipe compétente, réactive et disponible 24/7 pour l'urgence."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-begros-lightblue rounded-full flex items-center justify-center text-white font-bold">
                                    FN
                                </div>
                                <div>
                                    <p className="font-semibold text-begros-darkblue">Félix Nkongolo</p>
                                    <p className="text-sm text-gray-600">CEO, Aviation Express</p>
                                </div>
                            </div>
                        </div>

                        {/* Témoignage 3 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-begros-orange text-begros-orange" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">
                                "Profitabilité garantie avec Begro's. Services standards mondiaux à des coûts compétitifs. La meilleure solution pour l'Afrique centrale."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-begros-orange rounded-full flex items-center justify-center text-white font-bold">
                                    RT
                                </div>
                                <div>
                                    <p className="font-semibold text-begros-darkblue">Rose Talla</p>
                                    <p className="text-sm text-gray-600">Responsable Logistique, Global Logistics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== RESOURCES SECTION ==================== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-begros-darkblue mb-12">
                        Ressources opérationnelles pour l'Afrique Centrale
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Ressource 1 */}
                        <div className="bg-gradient-to-r from-begros-blue to-begros-darkblue text-white rounded-lg p-8 hover:shadow-lg transition duration-300">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Download size={28} />
                                        <h3 className="text-2xl font-bold">Brief opérationnel Cameroun</h3>
                                    </div>
                                    <p className="text-gray-200 mb-4">
                                        Documentation complète incluant procédures d'approche, données aéroportuaires et contacts locaux.
                                    </p>
                                    <MagneticButton distance={0.5}>
                                        <button className="bg-begros-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300">
                                            Télécharger PDF
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>

                        {/* Ressource 2 */}
                        <div className="bg-gradient-to-r from-begros-lightblue to-begros-blue text-white rounded-lg p-8 hover:shadow-lg transition duration-300">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Download size={28} />
                                        <h3 className="text-2xl font-bold">Guide des aéroports CEMAC</h3>
                                    </div>
                                    <p className="text-gray-200 mb-4">
                                        Guide complet des aéroports de la région avec services disponibles et tarifs.
                                    </p>
                                    <MagneticButton distance={0.5}>
                                        <button className="bg-begros-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300">
                                            Télécharger PDF
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CONTACT SECTION ==================== */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-begros-darkblue mb-12">
                        Prêt à décoller ? Contactez notre Ops Desk 24/7
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Infos de Contact */}
                        <div className="bg-begros-darkblue text-white rounded-lg p-8">
                            <h3 className="text-2xl font-bold mb-8">Operations Desk</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <Clock size={24} className="flex-shrink-0 text-begros-lightblue" />
                                    <div>
                                        <p className="font-semibold">Disponibilité</p>
                                        <p className="text-gray-200">24 heures / 7 jours par semaine</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <Phone size={24} className="flex-shrink-0 text-begros-orange" />
                                    <div>
                                        <p className="font-semibold">Téléphone</p>
                                        <p className="text-gray-200">(+237) 677-98-89-29</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <Mail size={24} className="flex-shrink-0 text-begros-orange" />
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-gray-200">Ops@begros-group.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <MapPin size={24} className="flex-shrink-0 text-begros-lightblue" />
                                    <div>
                                        <p className="font-semibold">Adresse</p>
                                        <p className="text-gray-200">
                                            Yaoundé, Tsinga<br/>
                                            Cameroun, Afrique Centrale
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulaire de Contact */}
                        <form onSubmit={handleFormSubmit} className="bg-white rounded-lg p-8 shadow-lg">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-begros-darkblue mb-2">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-begros-orange"
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-begros-darkblue mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-begros-orange"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-begros-darkblue mb-2">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-begros-orange"
                                    placeholder="+237 6XX-XX-XX-XX"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-begros-darkblue mb-2">
                                    Sujet
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-begros-orange"
                                    placeholder="Sujet de votre demande"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-begros-darkblue mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-begros-orange"
                                    placeholder="Décrivez votre demande..."
                                />
                            </div>

                            <MagneticButton distance={0.5}>
                                <button
                                    type="submit"
                                    className="w-full bg-begros-orange hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition duration-300 flex items-center justify-center gap-2"
                                >
                                    <Send size={20} />
                                    Envoyer le message
                                </button>
                            </MagneticButton>
                        </form>
                    </div>
                </div>
            </section>

            {/* ==================== WHATSAPP FLOATING BUTTON ==================== */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 rounded-full shadow-2xl transition duration-300 z-40 hover:scale-110"
                title="Contactez-nous sur WhatsApp"
            >
                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-16 h-16 rounded-full" />
            </a>
        </MainLayout>
    );
}

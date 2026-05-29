import { Link } from '@inertiajs/react';
import { Phone, Mail, MapPin } from 'lucide-react';
import GlowMenu from '@/Components/GlowMenu';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar avec GlowMenu */}
            <nav className="bg-begros-darkblue text-white sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                                <img src="/images/logo_begros.png" alt="Begro's Group" className="h-12 w-auto" />
                            </Link>
                        </div>

                        {/* GlowMenu */}
                        <div className="flex-1 flex justify-center">
                            <GlowMenu />
                        </div>

                        {/* Bouton Contact - Desktop */}
                        <div className="hidden md:block">
                            <a
                                href="#contact"
                                className="bg-begros-orange hover:bg-orange-600 text-white px-6 py-2 rounded transition duration-300 font-semibold"
                            >
                                Nous Contacter
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Colonne 1: Logo & Description */}
                        <div>
                            <img src="/images/logo_begros.png" alt="Begro's Group" className="h-16 w-auto mb-3" />
                            <p className="text-gray-400 text-sm">
                                Votre partenaire de confiance pour l'assistance au Cameroun et en Afrique Centrale.
                            </p>
                        </div>

                        {/* Colonne 2: Liens */}
                        <div>
                            <h4 className="font-semibold mb-4 text-begros-orange">Liens Utiles</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
                                <li><Link href="#services" className="hover:text-white transition">Services</Link></li>
                                <li><Link href="#about" className="hover:text-white transition">À propos</Link></li>
                                <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Colonne 3: Infos */}
                        <div>
                            <h4 className="font-semibold mb-4 text-begros-orange">Information</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li className="flex items-start gap-2">
                                    <Phone size={16} className="flex-shrink-0 mt-1" />
                                    <span>(+237) 677-98-89-29</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Mail size={16} className="flex-shrink-0 mt-1" />
                                    <span>Ops@begros-group.com</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin size={16} className="flex-shrink-0 mt-1" />
                                    <span>Yaoundé, Tsinga</span>
                                </li>
                            </ul>
                        </div>

                        {/* Colonne 4: Réseaux */}
                        <div>
                            <h4 className="font-semibold mb-4 text-begros-orange">Réseaux Sociaux</h4>
                            <a
                                href="https://wa.me/237677988929"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:opacity-80 transition"
                            >
                                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-10 h-10 rounded-full" />
                                <span className="text-gray-200">WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2024 Begro's Group. Tous droits réservés. | <Link href="#" className="hover:text-white transition">Mentions légales</Link></p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

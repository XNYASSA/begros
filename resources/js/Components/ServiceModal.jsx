import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function ServiceModal({ service, isOpen, onClose }) {
    const serviceDetails = {
        1: {
            fullTitle: 'Assistance Équipage Complète',
            description: 'Votre équipage mérite le meilleur traitement. Nos services d\'assistance équipage couvrent tous les aspects de votre séjour, de l\'arrivée à la destination au départ.',
            features: [
                'Accueil personnalisé à l\'aéroport',
                'Arrangements hôteliers haut de gamme',
                'Transport confortable et rapide',
                'Services de restauration de qualité',
                'Assistance 24/7 en cas de besoin',
                'Arrangements visa et documentation',
            ],
            benefits: 'Nos équipes expérimentées garantissent que votre équipage bénéficie d\'un service impeccable, vous permettant de vous concentrer sur votre mission.',
        },
        2: {
            fullTitle: 'Assistance Passagers Premium',
            description: 'Nous offrons une assistance passagers complète pour assurer une expérience fluide et confortable lors de chaque escale.',
            features: [
                'Accueil à l\'aéroport avec assistance personnalisée',
                'Services de correspondance optimisés',
                'Arrangements spéciaux pour les passagers VIP',
                'Assistance médicale si nécessaire',
                'Gestion des bagages et des réclamations',
                'Services de restauration et rafraîchissements',
            ],
            benefits: 'Nos services garantissent la satisfaction de vos passagers avec des solutions rapides et efficaces pour toute situation d\'escale.',
        },
        3: {
            fullTitle: 'Services Techniques Spécialisés',
            description: 'Nous fournissons une gamme complète de services techniques pour assurer le bon fonctionnement de votre aéronef.',
            features: [
                'Ravitaillement en carburant de qualité certifiée',
                'Services de catering professionnel',
                'Maintenance et inspection de l\'aéronef',
                'Services de nettoyage complets',
                'Approvisionnement en fournitures et équipements',
                'Assistance pour les services spécialisés',
            ],
            benefits: 'Nos technicians agréés et nos équipements modernes garantissent que votre aéronef est entre les mains expertes.',
        },
        4: {
            fullTitle: 'Opérations d\'Urgence 24/7',
            description: 'Nous sommes toujours prêts à répondre aux situations d\'urgence avec une réactivité maximale et une expertise éprouvée.',
            features: [
                'Réponse d\'urgence 24 heures sur 24, 7 jours sur 7',
                'Équipes médicales d\'urgence disponibles',
                'Assistance mécanique d\'urgence',
                'Coordination avec les autorités locales',
                'Support logistique immédiat',
                'Communication rapide avec votre opérations',
            ],
            benefits: 'Notre expérience en gestion de crise garantit une réponse rapide et efficace pour minimiser l\'impact des situations d\'urgence.',
        },
    };

    const details = serviceDetails[service?.id] || serviceDetails[1];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-begros-darkblue to-begros-blue text-white p-8 flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">{details.fullTitle}</h2>
                                    <p className="text-begros-lightblue text-sm">{service?.title}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="ml-4 p-2 hover:bg-white/20 rounded-lg transition"
                                    aria-label="Fermer"
                                >
                                    <X size={24} className="text-white" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">
                                {/* Description */}
                                <div>
                                    <h3 className="text-xl font-semibold text-begros-darkblue mb-3">
                                        Vue d'ensemble
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {details.description}
                                    </p>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="text-xl font-semibold text-begros-darkblue mb-4">
                                        Nos services incluent
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {details.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="text-begros-orange font-bold mt-1">✓</span>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Benefits */}
                                <div className="bg-begros-orange/10 border-l-4 border-begros-orange p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-begros-darkblue mb-2">
                                        Avantages clés
                                    </h3>
                                    <p className="text-gray-700">
                                        {details.benefits}
                                    </p>
                                </div>

                                {/* CTA */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button className="w-full bg-begros-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-300">
                                        Contactez-nous pour ce service
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

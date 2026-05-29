import { motion } from 'framer-motion';
import { GlowCard } from '@/Components/GlowCard';
import { ServiceModal } from '@/Components/ServiceModal';
import { MagneticButton } from '@/Components/MagneticButton';
import { useState } from 'react';

const services = [
    {
        id: 1,
        title: 'Assistance Équipage',
        description: 'Assistance complète pour l\'équipage incluant hôtels, transport et repas.',
        image: '/images/reservation.jpg',
        glowColor: 'orange',
    },
    {
        id: 2,
        title: 'Assistance Passagers',
        description: 'Services de correspondance et assistance confortable pour vos passagers.',
        image: '/images/assistance_passager.jpg',
        glowColor: 'blue',
    },
    {
        id: 3,
        title: 'Services Techniques',
        description: 'Ravitaillement, catering et services techniques spécialisés.',
        image: '/images/recharge_carburant.jpg',
        glowColor: 'green',
    },
    {
        id: 4,
        title: 'Opérations d\'Urgence',
        description: 'Assistance rapide et efficace en cas de situation d\'urgence 24/7.',
        image: '/images/permis.jpg',
        glowColor: 'red',
    },
];

export function ServicesCarousel() {
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedService(null), 300);
    };

    return (
        <>
            <div className="relative w-full bg-gray-50 py-20">
                {/* Services Grid - Static */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => openModal(service)}
                                className="cursor-pointer"
                            >
                                <GlowCard
                                    glowColor={service.glowColor}
                                    width={280}
                                    height={380}
                                    customSize={true}
                                >
                                    {/* Card Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col items-center justify-between rounded-2xl pointer-events-none">
                                        {/* Background Image - Clean and Sharp */}
                                        <div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{
                                                backgroundImage: `url(${service.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        />

                                        {/* Text Content with shadow for readability */}
                                        <div className="relative z-10 text-center mt-8">
                                            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                                                {service.title}
                                            </h3>
                                        </div>

                                        <div className="relative z-10 text-center mb-6">
                                            <p className="text-sm text-white leading-relaxed drop-shadow-md">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <MagneticButton distance={0.5}>
                                            <motion.button
                                                className="relative z-20 bg-begros-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 text-sm pointer-events-auto"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(service);
                                                }}
                                            >
                                                Détails
                                            </motion.button>
                                        </MagneticButton>
                                    </div>
                                </GlowCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Info Text */}
                <div className="text-center mt-12 text-gray-600">
                    <p className="text-sm">
                        ✨ Cliquez sur une carte pour en savoir plus ✨
                    </p>
                </div>
            </div>

            {/* Service Modal */}
            <ServiceModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}

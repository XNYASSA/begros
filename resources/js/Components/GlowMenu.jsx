import { motion } from 'framer-motion';
import { Home, Zap, Plane, Info, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    {
        icon: <Home className="h-5 w-5" />,
        label: 'Accueil',
        href: '#',
        gradient: 'radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, rgba(255, 107, 0, 0.06) 50%, rgba(255, 107, 0, 0) 100%)',
        iconColor: 'text-begros-orange',
    },
    {
        icon: <Zap className="h-5 w-5" />,
        label: 'Services',
        href: '#services',
        gradient: 'radial-gradient(circle, rgba(0, 61, 165, 0.15) 0%, rgba(0, 61, 165, 0.06) 50%, rgba(0, 61, 165, 0) 100%)',
        iconColor: 'text-begros-blue',
    },
    {
        icon: <Plane className="h-5 w-5" />,
        label: 'Flotte',
        href: '#fleet',
        gradient: 'radial-gradient(circle, rgba(77, 184, 232, 0.15) 0%, rgba(77, 184, 232, 0.06) 50%, rgba(77, 184, 232, 0) 100%)',
        iconColor: 'text-begros-lightblue',
    },
    {
        icon: <Info className="h-5 w-5" />,
        label: 'À propos',
        href: '#about',
        gradient: 'radial-gradient(circle, rgba(0, 29, 77, 0.15) 0%, rgba(0, 29, 77, 0.06) 50%, rgba(0, 29, 77, 0) 100%)',
        iconColor: 'text-begros-darkblue',
    },
    {
        icon: <Mail className="h-5 w-5" />,
        label: 'Contact',
        href: '#contact',
        gradient: 'radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, rgba(255, 107, 0, 0.06) 50%, rgba(255, 107, 0, 0) 100%)',
        iconColor: 'text-begros-orange',
    },
];

const itemVariants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
        opacity: 1,
        scale: 2,
        transition: {
            opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
        },
    },
};

const navGlowVariants = {
    initial: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const sharedTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    duration: 0.5,
};

export default function GlowMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Menu */}
            <motion.nav
                className="hidden md:block p-2 rounded-2xl bg-gradient-to-b from-begros-darkblue/80 to-begros-darkblue/40 backdrop-blur-lg border border-begros-blue/40 shadow-lg relative overflow-hidden"
                initial="initial"
                whileHover="hover"
            >
                <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-transparent via-begros-orange/30 via-30% via-begros-blue/30 via-60% via-begros-lightblue/30 via-90% to-transparent rounded-3xl z-0 pointer-events-none"
                    variants={navGlowVariants}
                />
                <ul className="flex items-center gap-2 relative z-10">
                    {menuItems.map((item) => (
                        <motion.li key={item.label} className="relative">
                            <motion.div
                                className="block rounded-xl overflow-visible group relative"
                                style={{ perspective: '600px' }}
                                whileHover="hover"
                                initial="initial"
                            >
                                <motion.div
                                    className="absolute inset-0 z-0 pointer-events-none"
                                    variants={glowVariants}
                                    style={{
                                        background: item.gradient,
                                        opacity: 0,
                                        borderRadius: '16px',
                                    }}
                                />
                                <motion.a
                                    href={item.href}
                                    className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-gray-300 group-hover:text-white transition-colors rounded-xl"
                                    variants={itemVariants}
                                    transition={sharedTransition}
                                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
                                >
                                    <span className="transition-colors duration-300 text-white">
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </motion.a>
                                <motion.a
                                    href={item.href}
                                    className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-gray-300 group-hover:text-white transition-colors rounded-xl"
                                    variants={backVariants}
                                    transition={sharedTransition}
                                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top', rotateX: 90 }}
                                >
                                    <span className="transition-colors duration-300 text-white">
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </motion.a>
                            </motion.div>
                        </motion.li>
                    ))}
                </ul>
            </motion.nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white p-2 rounded-lg hover:bg-begros-blue/30 transition"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-20 right-4 bg-begros-darkblue/95 backdrop-blur-lg border border-begros-blue/40 rounded-xl p-4 space-y-2 z-50"
                    >
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-begros-blue/30 rounded-lg transition"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>
        </>
    );
}

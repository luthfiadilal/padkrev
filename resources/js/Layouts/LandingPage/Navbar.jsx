import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Variants untuk animasi
    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
            },
        },
        exit: { opacity: 0, y: -20 },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0.5 },
        exit: { opacity: 0 },
    };

    const handleLogin = () => {
        router.get('/dashboard-seller');
    };
    return (
        <nav className="sticky top-0 z-50 w-full bg-white px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="h-[50px] w-[150px]">
                    <img
                        className="h-full w-full object-cover"
                        src="storage/img/padkrevlogo.png"
                        alt="Logo"
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden flex-1 items-center justify-between md:flex">
                    {/* Menu Tengah */}
                    <ul className="flex flex-1 justify-center gap-8">
                        <li>
                            <a
                                className="font-manropeMedium text-textgray transition hover:text-primary"
                                href="#"
                            >
                                Marketplace
                            </a>
                        </li>
                        <li>
                            <a
                                className="font-manropeMedium text-textgray transition hover:text-primary"
                                href="#"
                            >
                                Products
                            </a>
                        </li>
                        <li>
                            <a
                                className="font-manropeMedium text-textgray transition hover:text-primary"
                                href="#"
                            >
                                About
                            </a>
                        </li>
                    </ul>

                    {/* Login/Register Kanan */}
                    <div className="flex items-center gap-4">
                        <h5
                            onClick={handleLogin}
                            className="cursor-pointer text-18 font-manropeSemiBold text-primary"
                        >
                            Login
                        </h5>
                        <div className="flex cursor-pointer items-center gap-2">
                            <h5 className="text-18 font-manropeSemiBold text-secondary">
                                Register
                            </h5>
                            <img
                                src="storage/img/Arrow 1.svg"
                                alt="arrow"
                                className="h-[24px] w-[24px] object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Hamburger Button dengan animasi */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none md:hidden"
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? (
                        <X className="h-7 w-7" />
                    ) : (
                        <Menu className="h-7 w-7" />
                    )}
                </motion.button>
            </div>

            {/* Mobile Menu dengan animasi dan overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay blur di bawah navbar */}
                        <motion.div
                            key="overlay"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={overlayVariants}
                            className="fixed inset-0 top-[86px] z-40 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            key="mobile-menu"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={menuVariants}
                            className="fixed left-0 right-0 top-[86px] z-50 w-full bg-white px-6 py-4 shadow-xl md:hidden"
                        >
                            <div className="flex flex-col gap-4">
                                <a
                                    href="#"
                                    className="font-manropeMedium text-textgray transition hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="font-manropeMedium text-textgray transition hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Products
                                </a>
                                <a
                                    href="#"
                                    className="font-manropeMedium text-textgray transition hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </a>
                                <div className="border-t border-gray-200 pt-4">
                                    <h5
                                        onClick={handleLogin}
                                        className="mb-2 cursor-pointer text-18 font-manropeSemiBold text-primary"
                                    >
                                        Login
                                    </h5>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <h5 className="text-18 font-manropeSemiBold text-secondary">
                                            Register
                                        </h5>
                                        <img
                                            src="storage/img/Arrow 1.svg"
                                            alt="arrow"
                                            className="h-[24px] w-[24px] object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}

import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { Navbar as FlowbiteNavbar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Profile from './Profile';

export default function Navbar({ user, cartCount = 0 }) {
    const [logo, setLogo] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const [logoRes] = await Promise.all([
                    axios.get('/api/elemen/Logo'),
                ]);

                setLogo(logoRes.data);
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToCart = () => {
        router.get(route('cart.index'));
    };

    return (
        <FlowbiteNavbar
            fluid
            rounded
            className={`sticky top-0 z-50 rounded-none px-4 py-3 shadow-sm transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/55 backdrop-blur-md dark:bg-gray-800/80'
                    : 'bg-white dark:bg-gray-800'
            }`}
        >
            {/* Bagian Kiri - Logo */}
            <FlowbiteNavbar.Brand href="/" className="flex-1 md:flex-none">
                <div className="h-[50px] w-[150px]">
                    {loading ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <span className="text-sm text-gray-400">
                                Loading...
                            </span>
                        </div>
                    ) : logo ? (
                        <img
                            className="h-full w-full object-cover"
                            src={logo.image_url}
                            alt={logo.name}
                            onError={(e) => {
                                e.target.src = '/fallback-logo.png';
                            }}
                        />
                    ) : (
                        <img
                            className="h-full w-full object-cover"
                            src="/fallback-logo.png"
                            alt="Fallback"
                        />
                    )}
                </div>
            </FlowbiteNavbar.Brand>

            {/* Bagian Tengah - Menu (Tanpa Bullet Points) */}
            <div className="hidden flex-1 justify-center md:flex">
                <div
                    className={`flex list-none gap-8 ${isScrolled ? 'text-primary' : 'text-textgray'}`}
                >
                    {' '}
                    {/* Tambahkan list-none di sini */}
                    <a
                        href="/marketplace"
                        className={`font-manropeMedium hover:text-primary dark:text-gray-300 dark:hover:text-white ${
                            window.location.pathname === '/marketplace'
                                ? 'font-medium'
                                : ''
                        }`}
                    >
                        Marketplace
                    </a>
                    <a
                        // href="/developer-hub"
                        className={`cursor-pointer font-manropeMedium hover:text-primary dark:text-gray-300 dark:hover:text-white ${
                            window.location.pathname === '/developer-hub'
                                ? 'font-medium'
                                : ''
                        }`}
                        onClick={() => {
                            router.get(route('developer-hub'));
                        }}
                    >
                        Developer Hub
                    </a>
                </div>
            </div>

            {/* Bagian Kanan - Ikon */}
            <div className="flex items-center gap-4">
                <button
                    className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleToCart}
                >
                    {/* ICON KERANJANG */}
                    <Icon
                        icon="solar:cart-3-outline"
                        width={26}
                        className={`dark:text-gray-300 ${isScrolled ? 'text-primary' : 'text-textgray'}`}
                    />
                    {cartCount > 0 && (
                        <span className="font-semibold absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                            {cartCount}
                        </span>
                    )}
                </button>
                <Profile user={user} />
            </div>

            {/* Toggle untuk Mobile */}
            <FlowbiteNavbar.Toggle
                className={`md:hidden ${isScrolled ? 'text-primary' : 'text-textgray'}`}
            />

            {/* Menu Mobile (Tanpa Bullet Points) */}
            <FlowbiteNavbar.Collapse
                className={`list-none md:hidden ${isScrolled ? 'text-primary' : 'text-textgray'}`}
            >
                {' '}
                {/* Tambahkan list-none di sini */}
                <a
                    href="/marketplace"
                    className="block px-3 py-2 font-manropeMedium dark:text-gray-300"
                >
                    Marketplace
                </a>
                <a
                    // href="/developer-hub"
                    className="block cursor-pointer px-3 py-2 font-manropeMedium dark:text-gray-300"
                    onClick={() => {
                        router.get(route('developer-hub'));
                    }}
                >
                    Developer Hub
                </a>
            </FlowbiteNavbar.Collapse>
        </FlowbiteNavbar>
    );
}

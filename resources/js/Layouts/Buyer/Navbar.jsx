import { Icon } from '@iconify/react';
import axios from 'axios';
import { Navbar as FlowbiteNavbar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Profile from './Profile';

export default function Navbar() {
    const [logo, setLogo] = useState(null);

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

    return (
        <FlowbiteNavbar
            fluid
            rounded
            className="rounded-none px-4 py-3 shadow-sm dark:bg-gray-800"
        >
            {/* Bagian Kiri - Logo */}
            <FlowbiteNavbar.Brand href="/" className="flex-1 md:flex-none">
                <div className="h-[50px] w-[150px]">
                    {logo && (
                        <img
                            className="h-full w-full object-cover"
                            src={logo.image_url}
                            alt={logo.name}
                            onError={(e) => {
                                e.target.src = '/fallback-logo.png';
                            }}
                        />
                    )}
                </div>
            </FlowbiteNavbar.Brand>

            {/* Bagian Tengah - Menu (Tanpa Bullet Points) */}
            <div className="hidden flex-1 justify-center md:flex">
                <div className="flex list-none gap-8">
                    {' '}
                    {/* Tambahkan list-none di sini */}
                    <a
                        href="/marketplace"
                        className={`text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white ${
                            window.location.pathname === '/marketplace'
                                ? 'font-medium'
                                : ''
                        }`}
                    >
                        Marketplace
                    </a>
                    <a
                        href="/products"
                        className={`text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white ${
                            window.location.pathname === '/products'
                                ? 'font-medium'
                                : ''
                        }`}
                    >
                        Products
                    </a>
                    <a
                        href="/developer-hub"
                        className={`text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white ${
                            window.location.pathname === '/developer-hub'
                                ? 'font-medium'
                                : ''
                        }`}
                    >
                        Developer Hub
                    </a>
                </div>
            </div>

            {/* Bagian Kanan - Ikon */}
            <div className="flex items-center gap-4">
                <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Icon
                        icon="solar:cart-3-outline"
                        width={26}
                        className="text-textgray dark:text-gray-300"
                    />
                </button>
                <Profile />
            </div>

            {/* Toggle untuk Mobile */}
            <FlowbiteNavbar.Toggle className="md:hidden" />

            {/* Menu Mobile (Tanpa Bullet Points) */}
            <FlowbiteNavbar.Collapse className="list-none md:hidden">
                {' '}
                {/* Tambahkan list-none di sini */}
                <a
                    href="/marketplace"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300"
                >
                    Marketplace
                </a>
                <a
                    href="/products"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300"
                >
                    Products
                </a>
                <a
                    href="/developer-hub"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300"
                >
                    Developer Hub
                </a>
            </FlowbiteNavbar.Collapse>
        </FlowbiteNavbar>
    );
}

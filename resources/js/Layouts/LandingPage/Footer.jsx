import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [logo, setLogo] = useState(false);

    useEffect(() => {
        axios
            .get('/api/elemen/Logo')
            .then((response) => {
                setLogo(response.data);
            })
            .catch((error) => {
                console.error('Error loading logo:', error);
            });
    }, []);
    return (
        <footer className="bg-[#F5F5F5] px-10 py-10 md:px-24">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {/* CUSTOMER SERVICE */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-16 font-manropeBold text-secondary md:text-20">
                        CUSTOMER SERVICE
                    </h4>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Resolution Center
                    </a>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        How to shop
                    </a>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        How to use
                    </a>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Free shipping
                    </a>
                </div>

                {/* PADKREV */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-16 font-manropeBold text-secondary md:text-20">
                        PADKREV
                    </h4>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        About Information
                    </a>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Categories
                    </a>
                </div>

                {/* HELP */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-16 font-manropeBold text-secondary md:text-20">
                        HELP
                    </h4>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Terms & Conditions
                    </a>
                    <a
                        href="#"
                        className="text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Contact Us
                    </a>
                </div>

                {/* LOGO & LINK */}
                <div className="flex flex-col items-start gap-2">
                    <div className="relative h-[50px] w-[150px]">
                        {logo && (
                            <img
                                className="absolute left-[-20px] top-[-6px] h-full w-full object-cover"
                                src={logo.image_url}
                                alt="Logo"
                            />
                        )}
                    </div>

                    <a
                        onClick={() => router.get(route('login'))}
                        className="cursor-pointer text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Login
                    </a>
                    <a
                        onClick={() => router.get(route('register'))}
                        className="cursor-pointer text-12 font-manropeMedium text-textgray hover:underline md:text-16"
                    >
                        Register
                    </a>
                </div>
            </div>
        </footer>
    );
}

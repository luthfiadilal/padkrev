// resources/js/Components/Banner.jsx
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Banner() {
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('/api/elemen/Banner');
                setBanner(response.data);
            } catch (err) {
                console.error('Error fetching banner:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };

    if (loading) return <div className="h-64 animate-pulse bg-gray-200"></div>;
    if (error)
        return (
            <div className="h-64 bg-red-100 p-4 text-red-600">
                Error loading banner: {error}
            </div>
        );

    return (
        <div className="mb-[-20px] w-full px-4 py-8 sm:px-10 sm:py-[30px]">
            <div className="relative h-[320px] w-full overflow-hidden rounded-lg">
                {banner && (
                    <>
                        <img
                            src={banner.image_url}
                            alt="Banner PadKrev"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-8">
                            <div className="w-full max-w-2xl text-center">
                                <p className="mb-6 text-32 font-manropeSemiBold leading-tight text-white">
                                    Dapatkan produk terbaik dari kreativitas
                                    lokal Padalarang
                                </p>

                                {/* Search Bar */}
                                <form
                                    onSubmit={handleSearch}
                                    className="relative mb-4"
                                >
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        className="w-full rounded-full py-4 pl-6 pr-12 text-gray-800 shadow-lg focus:outline-none"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center gap-3 rounded-full bg-secondary px-3 py-2 text-white hover:bg-secondary"
                                    >
                                        <Icon
                                            icon="solar:magnifer-linear"
                                            width={22}
                                        />
                                        <h5 className="text-white">Cari</h5>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

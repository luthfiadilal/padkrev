import { router } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Categories() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const [food, setFood] = useState(false);
    const [cloth, setCloth] = useState(false);
    const [wo, setWo] = useState(false);
    const [house, setHouse] = useState(false);
    const [arrow, setArrow] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const [foodRes, clothRes, woRes, houseRes, arrowRes] =
                    await Promise.all([
                        axios.get('/api/elemen/Food'), // Sesuaikan dengan nama di database
                        axios.get('/api/elemen/Cloth'), // Sesuaikan dengan nama di database
                        axios.get('/api/elemen/WO'), // Sesuaikan dengan nama di database
                        axios.get('/api/elemen/House'),
                        axios.get('/api/elemen/Arrow 1'), // Sesuaikan dengan nama di database
                    ]);

                setFood(foodRes.data);
                setCloth(clothRes.data);
                setWo(woRes.data);
                setHouse(houseRes.data);
                setArrow(arrowRes.data);
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
        <div className="flex w-full flex-col gap-4 pb-[70px] md:px-[100px] md:pb-[100px]">
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 1.6, ease: 'easeOut' }}
                className="mb-[100px] flex flex-col items-center justify-center gap-2 text-center"
            >
                <h2 className="text-22 font-manropeExtraBold text-primary md:text-30">
                    Categories
                </h2>
                <p className="w-[70%] text-14 font-manropeSemiBold text-textgray">
                    Temukan berbagai produk dan layanan unggulan dari pelaku
                    UMKM Padalarang yang telah kami kurasi.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 1.6, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-6 px-[60px] md:grid-cols-4 md:gap-4 md:p-4"
            >
                {/* Card Makanan */}
                <div className="flex flex-col gap-2 bg-white px-4 py-5 shadow md:h-[315px] md:w-[255px] md:gap-2 md:p-6 md:shadow-lg">
                    <div className="flex items-center justify-center">
                        {food && (
                            <img
                                className="md:w-[130px]"
                                src={food.image_url}
                                alt="Makanan Khas Padalarang"
                            />
                        )}
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Makanan
                    </h5>
                    <p className="line-clamp-3 text-12 font-manropeSemiBold text-textgray">
                        Temukan aneka makanan khas Padalarang seperti opak,
                        dodol, dan berbagai camilan tradisional lainnya yang
                        dibuat dengan resep turun-temurun...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6
                            onClick={() =>
                                router.get(route('marketplace-index'))
                            }
                            className="cursor-pointer text-14 font-manropeSemiBold text-secondary md:text-16"
                        >
                            Explore Now
                        </h6>
                        {arrow && <img src={arrow.image_url} alt="" />}
                    </div>
                </div>

                {/* Card Pakaian */}
                <div className="flex flex-col gap-2 bg-white px-4 py-5 shadow md:h-[315px] md:w-[255px] md:gap-2 md:p-6 md:shadow-lg">
                    <div className="flex items-center justify-center pl-4">
                        {cloth && (
                            <img
                                className="md:h-[130px] md:w-[180px]"
                                src={cloth.image_url}
                                alt="Pakaian Lokal"
                            />
                        )}
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Pakaian
                    </h5>
                    <p className="line-clamp-3 text-12 font-manropeSemiBold text-textgray">
                        Berbagai produk fashion lokal seperti batik khas
                        Padalarang, konveksi berkualitas, dan produk tekstil
                        handmade dengan desain unik...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6
                            onClick={() =>
                                router.get(route('marketplace-index'))
                            }
                            className="cursor-pointer text-14 font-manropeSemiBold text-secondary md:text-16"
                        >
                            Explore Now
                        </h6>
                        {arrow && <img src={arrow.image_url} alt="" />}
                    </div>
                </div>

                {/* Card Jasa */}
                <div className="flex flex-col gap-2 bg-white px-4 py-5 shadow md:h-[315px] md:w-[255px] md:gap-2 md:p-6 md:shadow-lg">
                    <div className="flex items-center justify-center">
                        {wo && (
                            <img
                                className="md:h-[130px] md:w-[154px]"
                                src={wo.image_url}
                                alt="Jasa EO/WO"
                            />
                        )}
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Jasa
                    </h5>
                    <p className="line-clamp-3 text-12 font-manropeSemiBold text-textgray">
                        Layanan profesional untuk acara Anda termasuk event
                        organizer, wedding organizer, dekorasi, dan berbagai
                        jasa kreatif lainnya...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6
                            onClick={() =>
                                router.get(route('marketplace-index'))
                            }
                            className="cursor-pointer text-14 font-manropeSemiBold text-secondary md:text-16"
                        >
                            Explore Now
                        </h6>
                        {arrow && <img src={arrow.image_url} alt="" />}
                    </div>
                </div>

                {/* Card Penginapan */}
                <div className="flex flex-col gap-2 bg-white px-4 py-5 shadow md:h-[315px] md:w-[255px] md:gap-2 md:p-6 md:shadow-lg">
                    <div className="flex items-center justify-center pl-4">
                        {house && (
                            <img
                                className="md:h-[130px] md:w-[215px]"
                                src={house.image_url}
                                alt="Penginapan"
                            />
                        )}
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Penginapan
                    </h5>
                    <p className="line-clamp-3 text-12 font-manropeSemiBold text-textgray">
                        Temukan berbagai pilihan penginapan mulai dari
                        kos-kosan, homestay, hingga kontrakan dengan fasilitas
                        lengkap dan harga terjangkau...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6
                            onClick={() =>
                                router.get(route('marketplace-index'))
                            }
                            className="cursor-pointer text-14 font-manropeSemiBold text-secondary md:text-16"
                        >
                            Explore Now
                        </h6>
                        {arrow && <img src={arrow.image_url} alt="" />}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

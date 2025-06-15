import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const [vector3d, setVector3d] = useState(false);
    const [arrow, setArrow] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const [vectorRes, arrowRes] = await Promise.all([
                    axios.get('/api/elemen/Vector 3D'),
                    axios.get('/api/elemen/Arrow 1'), // Sesuaikan dengan nama di database
                ]);

                setVector3d(vectorRes.data);
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
        <div className="mt-4 flex w-full flex-col-reverse items-center justify-between gap-10 px-4 py-4 md:flex-row md:gap-4 md:px-[100px]">
            {/* TEXT - Masuk dari kiri */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -80 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 1.6, ease: 'easeOut' }}
                className="flex-2 flex flex-col items-center justify-between gap-7 text-center md:flex-col md:justify-between md:text-left"
            >
                <h2 className="w-[70%] text-26 font-manropeExtraBold leading-[1.2] text-primary md:w-full md:text-50 md:leading-[1.1]">
                    Bangkitkan{' '}
                    <span className="text-secondary">Kreativitas Lokal</span>,
                    Mulai dari Sini.
                </h2>
                <p className="-mt-1 w-[70%] text-14 font-manropeSemiBold leading-[1.2] text-textgray md:w-full md:text-24 md:leading-[1.1]">
                    Temukan produk dan jasa terbaik dari UMKM Padalarang
                </p>
                <div className="flex w-full justify-center gap-2 md:justify-start md:gap-3">
                    <h5
                        onClick={() => router.get(route('marketplace-index'))}
                        className="cursor-pointer text-14 font-manropeSemiBold text-secondary md:text-18"
                    >
                        Explore Now
                    </h5>
                    {arrow && (
                        <img
                            src={arrow.image_url}
                            alt={arrow.name}
                            className="w-4 md:w-auto"
                            onError={(e) => {
                                e.target.src = '/fallback-logo.png';
                            }}
                        />
                    )}
                </div>
            </motion.div>

            {/* IMAGE - Masuk dari kanan secara perlahan */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
                className="flex-2 relative w-full"
            >
                {vector3d && (
                    <img
                        className="mx-auto w-full max-w-[300px] md:max-w-[500px]"
                        src={vector3d.image_url}
                        alt={vector3d.name}
                        onError={(e) => {
                            e.target.src = '/fallback-logo.png';
                        }}
                    />
                )}

                {/* Info bubble di bawah gambar - diubah untuk mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                    className="absolute -bottom-2 left-1/2 flex w-[90%] -translate-x-1/2 transform items-center justify-center rounded-lg bg-[#717171]/[0.35] px-3 py-2 backdrop-blur-md md:bottom-7 md:left-[100px] md:w-[400px] md:translate-x-0 md:px-5 md:py-4"
                >
                    <h4 className="text-center text-14 font-manropeSemiBold text-white md:text-20">
                        Lebih dari 100+ pengusaha dengan berbagai inovasinya
                    </h4>
                </motion.div>
            </motion.div>
        </div>
    );
}

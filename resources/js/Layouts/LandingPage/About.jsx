import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function About() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const [elemen, setElemen] = useState(false);
    const [vector2, setVector2] = useState(false);
    const [shoppingBag, setShoppingBag] = useState(false);
    const [ai, setAi] = useState(false);
    const [map, setMap] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const [elemenRes, vector2Res, shoppingBagRes, aiRes, mapRes] =
                    await Promise.all([
                        axios.get('/api/elemen/Elemen'), // Sesuaikan dengan nama di database
                        axios.get('/api/elemen/Vector 2'),
                        axios.get('/api/elemen/Shopping Bag'), // Sesuaikan dengan nama di database
                        axios.get('/api/elemen/AI'), // Sesuaikan dengan nama di database
                        axios.get('/api/elemen/Map'), // Sesuaikan dengan nama di database
                    ]);

                setElemen(elemenRes.data);
                setVector2(vector2Res.data);
                setShoppingBag(shoppingBagRes.data);
                setAi(aiRes.data);
                setMap(mapRes.data);
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
        <div id="about" className="relative mt-5 w-full">
            {/* Background SVG, tidak terpengaruh padding */}
            {elemen && (
                <img
                    src={elemen.image_url}
                    alt="Background"
                    className="absolute left-0 top-[160px] -z-10 w-[400px] md:left-0 md:top-[100px] md:w-[500px]"
                />
            )}

            <div className="w-full px-[40px] py-[120px] md:px-[100px]">
                <div className="flex items-center justify-center">
                    <motion.h2
                        ref={ref}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{
                            delay: 0.3,
                            duration: 1.6,
                            ease: 'easeOut',
                        }}
                        className="text-22 font-manropeExtraBold text-primary md:text-30"
                    >
                        About
                    </motion.h2>
                </div>
                {/* Grid konten */}
                <div className="mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    {/* Kiri: Ilustrasi */}
                    <div className="relative flex h-full w-full items-center justify-center">
                        {/* Ilustrasi vector */}
                        {vector2 && (
                            <motion.img
                                initial={{ opacity: 0, x: -80 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    delay: 0.3,
                                    duration: 1.6,
                                    ease: 'easeOut',
                                }}
                                src={vector2.image_url}
                                alt="Ilustrasi"
                                className="relative z-10 w-full max-w-[600px] md:max-w-[800px]"
                            />
                        )}
                    </div>

                    {/* Tengah & Kanan: Teks (gabung 2 kolom) */}
                    <div className="md:col-span-1">
                        <motion.p
                            initial={{ opacity: 0, x: 80 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                delay: 0.3,
                                duration: 1.6,
                                ease: 'easeOut',
                            }}
                            className="text-14 font-manropeMedium leading-relaxed text-textgray md:text-18"
                        >
                            Padkrev (Padalarang Kreativ) adalah platform digital
                            yang dirancang untuk memberdayakan UMKM lokal di
                            Padalarang dengan menghubungkan pelaku usaha dan
                            konsumen melalui layanan online yang mudah dan
                            terpercaya. Platform ini menyediakan beragam produk
                            lokal berkualitas seperti makanan, pakaian, dan
                            kerajinan, serta layanan jasa seperti EO, WO, sewa
                            dekorasi, dan informasi kos-kosan. Dengan misi
                            mendorong pertumbuhan ekonomi kreatif, Padkrev
                            bertujuan memperluas jangkauan pasar UMKM,
                            meningkatkan visibilitas usaha, dan menciptakan
                            peluang baru melalui teknologi.
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        delay: 0.3,
                        duration: 1.6,
                        ease: 'easeOut',
                    }}
                    className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
                        {shoppingBag && (
                            <img
                                src={shoppingBag.image_url}
                                alt=""
                                className="h-10 w-10"
                            />
                        )}

                        <h4 className="text-base font-manropeBold text-primary">
                            Terintegrasi dan Lengkap
                        </h4>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
                        {ai && (
                            <img
                                src={ai.image_url}
                                alt=""
                                className="h-10 w-10"
                            />
                        )}

                        <h4 className="text-base font-manropeBold text-primary">
                            Dukungan Teknologi untuk UMKM
                        </h4>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
                        {map && (
                            <img
                                src={map.image_url}
                                alt=""
                                className="h-10 w-10"
                            />
                        )}

                        <h4 className="text-base font-manropeBold text-primary">
                            Dukungan Teknologi untuk UMKM
                        </h4>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

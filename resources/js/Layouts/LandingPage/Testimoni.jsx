import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Testimoni() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    return (
        <div className="flex w-full flex-col gap-4 pb-[50px] md:px-[100px] md:pb-[100px] md:pt-[70px]">
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 1.6, ease: 'easeOut' }}
                className="mb-[50px] flex flex-col justify-center gap-2 text-center md:mb-[100px]"
            >
                <h2 className="text-22 font-manropeExtraBold text-primary md:text-30">
                    Testimoni
                </h2>
                <p className="text-14 md:text-16 font-manropeSemiBold text-textgray">
                    Dengarkan pengalaman langsung dari pelanggan kami
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 1.6, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-6 px-[40px] md:grid-cols-3 md:gap-8 md:px-[60px]"
            >
                {/* Testimoni 1 */}
                <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg md:gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                            <img
                                src="https://randomuser.me/api/portraits/women/43.jpg"
                                alt="Sarah"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-16 font-manropeSemiBold md:text-18">
                                Sarah Wijaya
                            </h3>
                            <p className="text-12 md:text-14 font-manropeMedium text-textgray">
                                Pemilik Kedai Kopi
                            </p>
                        </div>
                    </div>

                    <p className="text-14 md:text-16 font-manropeRegular text-textgray">
                        "Padkrev sangat membantu memperluas pasar saya. Dalam 3
                        bulan, penjualan meningkat 40% berkat platform ini!"
                    </p>
                    <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 md:h-5 md:w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>

                {/* Testimoni 2 */}
                <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg md:gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Budi"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-16 font-manropeSemiBold md:text-18">
                                Budi Santoso
                            </h3>
                            <p className="text-12 md:text-14 font-manropeMedium text-textgray">
                                Pengusaha Batik
                            </p>
                        </div>
                    </div>

                    <p className="text-14 md:text-16 font-manropeRegular text-textgray">
                        "Platform yang sangat user-friendly! Sekarang produk
                        batik saya bisa menjangkau pembeli dari berbagai kota."
                    </p>
                    <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 md:h-5 md:w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>

                {/* Testimoni 3 */}
                <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg md:gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                            <img
                                src="https://randomuser.me/api/portraits/women/65.jpg"
                                alt="Dewi"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-16 font-manropeSemiBold md:text-18">
                                Dewi Rahayu
                            </h3>
                            <p className="text-12 md:text-14 font-manropeMedium text-textgray">
                                Event Organizer
                            </p>
                        </div>
                    </div>

                    <p className="text-14 md:text-16 font-manropeRegular text-textgray">
                        "Padkrev membantu bisnis EO saya mendapatkan klien baru.
                        Sistemnya sangat membantu UMKM seperti kami."
                    </p>
                    <div className="flex gap-1 text-yellow-400">
                        {[...Array(4)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 md:h-5 md:w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-300 md:h-5 md:w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

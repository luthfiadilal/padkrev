import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Categories() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
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
                <p className="text-14 w-[70%] font-manropeSemiBold text-textgray">
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
                        <img
                            className="md:w-[130px]"
                            src="storage/img/food.svg"
                            alt="Makanan Khas Padalarang"
                        />
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Makanan
                    </h5>
                    <p className="text-12 line-clamp-3 font-manropeSemiBold text-textgray">
                        Temukan aneka makanan khas Padalarang seperti opak,
                        dodol, dan berbagai camilan tradisional lainnya yang
                        dibuat dengan resep turun-temurun...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6 className="text-14 md:text-16 font-manropeSemiBold text-secondary">
                            Explore Now
                        </h6>
                        <img src="storage/img/Arrow 1.svg" alt="" />
                    </div>
                </div>

                {/* Card Pakaian */}
                <div className="flex flex-col gap-2 bg-white px-4 py-5 shadow md:h-[315px] md:w-[255px] md:gap-2 md:p-6 md:shadow-lg">
                    <div className="flex items-center justify-center pl-4">
                        <img
                            className="md:h-[130px] md:w-[180px]"
                            src="storage/img/cloth.svg"
                            alt="Pakaian Lokal"
                        />
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Pakaian
                    </h5>
                    <p className="text-12 line-clamp-3 font-manropeSemiBold text-textgray">
                        Berbagai produk fashion lokal seperti batik khas
                        Padalarang, konveksi berkualitas, dan produk tekstil
                        handmade dengan desain unik...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6 className="text-14 md:text-16 font-manropeSemiBold text-secondary">
                            Explore Now
                        </h6>
                        <img src="storage/img/Arrow 1.svg" alt="" />
                    </div>
                </div>

                {/* Card Jasa */}
                <div className="flex flex-col gap-2 bg-white px-4 py-5 shadow md:h-[315px] md:w-[255px] md:gap-2 md:p-6 md:shadow-lg">
                    <div className="flex items-center justify-center">
                        <img
                            className="md:h-[130px] md:w-[154px]"
                            src="storage/img/wo.svg"
                            alt="Jasa EO/WO"
                        />
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Jasa
                    </h5>
                    <p className="text-12 line-clamp-3 font-manropeSemiBold text-textgray">
                        Layanan profesional untuk acara Anda termasuk event
                        organizer, wedding organizer, dekorasi, dan berbagai
                        jasa kreatif lainnya...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6 className="text-14 md:text-16 font-manropeSemiBold text-secondary">
                            Explore Now
                        </h6>
                        <img src="storage/img/Arrow 1.svg" alt="" />
                    </div>
                </div>

                {/* Card Penginapan */}
                <div className="flex flex-col gap-2 bg-white px-4 py-5 shadow md:h-[315px] md:w-[255px] md:gap-2 md:p-6 md:shadow-lg">
                    <div className="flex items-center justify-center pl-4">
                        <img
                            className="md:h-[130px] md:w-[215px]"
                            src="storage/img/house.svg"
                            alt="Penginapan"
                        />
                    </div>

                    <h5 className="text-16 font-manropeExtraBold text-primary md:text-20">
                        Penginapan
                    </h5>
                    <p className="text-12 line-clamp-3 font-manropeSemiBold text-textgray">
                        Temukan berbagai pilihan penginapan mulai dari
                        kos-kosan, homestay, hingga kontrakan dengan fasilitas
                        lengkap dan harga terjangkau...
                    </p>
                    <div className="flex items-center gap-2">
                        <h6 className="text-14 md:text-16 font-manropeSemiBold text-secondary">
                            Explore Now
                        </h6>
                        <img src="storage/img/Arrow 1.svg" alt="" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

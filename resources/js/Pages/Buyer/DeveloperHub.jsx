import DynamicHead from '@/Components/DynamicHead';
import Navbar from '@/Layouts/Buyer/Navbar';
import { Icon } from '@iconify/react';
import { usePage } from '@inertiajs/react';

export default function DeveloperHub() {
    const { user, cartCount } = usePage().props;

    const developer = {
        name: 'Deyya',
        phone: '+62 813-9573-5740',
        phoneClean: '6281395735740',
    };

    return (
        <>
            <DynamicHead>
                <title>Pusat Bantuan Developer</title>
            </DynamicHead>
            <Navbar user={user} cartCount={cartCount} />

            <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
                <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                    <h1 className="font-bold mb-4 text-2xl text-gray-800 dark:text-white">
                        Pusat Bantuan Developer
                    </h1>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                        Jika kamu mengalami kendala saat menggunakan platform
                        ini — seperti error saat checkout, kesulitan mengakses
                        fitur, atau bug lainnya — jangan ragu untuk menghubungi
                        developer. Kami siap membantu!
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Icon
                                icon="mdi:whatsapp"
                                className="text-2xl text-green-500"
                            />
                            <a
                                href={`https://wa.me/${developer.phoneClean}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Hubungi via WhatsApp:{' '}
                                <strong>{developer.phone}</strong>
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 rounded-lg bg-gray-100 p-4 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                        <p className="font-semibold mb-2">
                            Tips sebelum menghubungi:
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Coba refresh halaman terlebih dahulu</li>
                            <li>Pastikan koneksi internet stabil</li>
                            <li>Catat langkah-langkah sebelum error muncul</li>
                            <li>Sertakan screenshot jika memungkinkan</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}

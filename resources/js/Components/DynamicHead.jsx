import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function DynamicHead({ children }) {
    const [favicon, setFavicon] = useState(null);

    useEffect(() => {
        const fetchFavicon = async () => {
            try {
                const response = await axios.get(
                    'http://padkrev.test/api/elemen/Favicon',
                );
                const faviconData = {
                    url: response.data.image_url,
                    ext: response.data.path_image.split('.').pop(),
                };
                setFavicon(faviconData);

                // Hapus semua favicon yang ada
                document
                    .querySelectorAll("link[rel*='icon']")
                    .forEach((el) => el.remove());

                // Buat favicon baru
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = faviconData.url;
                link.type =
                    faviconData.ext === 'svg'
                        ? 'image/svg+xml'
                        : `image/${faviconData.ext}`;
                document.head.appendChild(link);
            } catch (err) {
                console.error('Error loading favicon:', err);
                // Fallback ke favicon default
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = '/fallback-favicon.ico';
                document.head.appendChild(link);
            }
        };

        fetchFavicon();
    }, []);

    return (
        <Head>
            {favicon && (
                <link
                    rel="icon"
                    href={favicon.url}
                    type={
                        favicon.ext === 'svg'
                            ? 'image/svg+xml'
                            : `image/${favicon.ext}`
                    }
                />
            )}
            {children}
        </Head>
    );
}

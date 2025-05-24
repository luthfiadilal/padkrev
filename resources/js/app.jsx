import 'simplebar-react/dist/simplebar.min.css';
import '../css/app.css';
import '../css/layouts/scrollbar.css';
import '../css/theme/default-colors.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { ThemeModeScript } from 'flowbite-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <ThemeModeScript />
                <BrowserRouter>
                    <App {...props} />
                </BrowserRouter>
            </>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

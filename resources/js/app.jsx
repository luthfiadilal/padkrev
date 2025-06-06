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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createInertiaApp({
    title: (title) => `${title}`,
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
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    progressClassName={'bg-primary'}
                />
            </>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

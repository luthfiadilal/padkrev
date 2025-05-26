import { Icon } from '@iconify/react';
import { usePage } from '@inertiajs/react';
import { Sidebar } from 'flowbite-react';

const NavItems = ({ item, onClick }) => {
    const { url } = usePage();

    // Fungsi untuk ekstrak path dari URL (tanpa domain dan query)
    const getPath = (fullUrl) => {
        try {
            const urlObj = new URL(fullUrl, window.location.origin);
            return urlObj.pathname;
        } catch {
            return fullUrl; // Fallback jika parsing gagal
        }
    };

    // Dapatkan URL saat ini (path saja)
    const currentPath = getPath(url);

    // Fungsi untuk mendapatkan target URL
    const getTargetUrl = () => {
        try {
            if (item.route) {
                try {
                    return route(item.route);
                } catch {
                    return item.url;
                }
            }
            return item.url;
        } catch {
            return '#';
        }
    };

    // Dapatkan target path (normalisasi tanpa trailing slash)
    const targetPath = getPath(getTargetUrl()).replace(/\/+$/, '');
    const normalizedCurrentPath = currentPath.replace(/\/+$/, '');

    const isActive = normalizedCurrentPath === targetPath;

    return (
        <Sidebar.Item
            href={targetPath}
            onClick={(e) => {
                e.preventDefault();
                if (typeof onClick === 'function') {
                    onClick(e);
                }
            }}
            className={`${
                isActive
                    ? 'active rounded-xl bg-primary text-white shadow-btnshdw hover:bg-primary hover:text-white dark:hover:text-white'
                    : 'group/link bg-transparent text-link hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            active={isActive}
        >
            <span className="align-center flex items-center gap-3">
                {item.icon ? (
                    <Icon
                        icon={item.icon}
                        className={`${isActive ? 'text-white' : item.color || 'text-gray-600 dark:text-gray-300'}`}
                        height={18}
                    />
                ) : (
                    <span
                        className={`${
                            isActive
                                ? 'mx-1.5 h-[6px] w-[6px] rounded-full !bg-white group-hover/link:bg-white dark:bg-white'
                                : 'mx-1.5 h-[6px] w-[6px] rounded-full bg-gray-400 group-hover/link:bg-primary dark:bg-gray-300'
                        }`}
                    ></span>
                )}
                <span
                    className={`max-w-36 overflow-hidden ${isActive ? 'font-medium' : ''}`}
                >
                    {item.name}
                </span>
            </span>
        </Sidebar.Item>
    );
};

export default NavItems;

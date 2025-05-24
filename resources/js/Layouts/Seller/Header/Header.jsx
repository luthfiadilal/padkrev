import { Icon } from '@iconify/react';
import { Drawer, Navbar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import MobileSidebar from '../Sidebar/MobileSidebar';
import Profile from './Profile';
import Notification from './notification';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                // breakpoint xl
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('drawer-open');
        } else {
            document.body.classList.remove('drawer-open');
        }
    }, [isOpen]);

    // mobile-sidebar

    return (
        <>
            <header
                className={`sticky top-0 z-[5] ${
                    isSticky ? 'fixed w-full bg-white dark:bg-dark' : 'bg-white'
                }`}
            >
                <Navbar
                    fluid
                    className={`rounded-none bg-transparent px-4 py-4 dark:bg-transparent sm:px-30`}
                >
                    {/* Mobile Toggle Icon */}

                    <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="z-[10000] flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-lightprimary hover:text-primary dark:text-white xl:hidden"
                                aria-label="Buka menu"
                                aria-expanded={isOpen}
                                aria-controls="mobile-sidebar"
                            >
                                <Icon
                                    icon="solar:hamburger-menu-line-duotone"
                                    height={21}
                                />
                            </button>
                            <Notification />
                        </div>

                        <div className="flex items-center gap-4">
                            <Profile />
                        </div>
                    </div>
                </Navbar>
            </header>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[70] bg-gray-900/50 dark:bg-gray-900/80"
                        onClick={handleClose}
                    />
                    <Drawer
                        open={isOpen}
                        onClose={handleClose}
                        className="!fixed !z-[80] !w-64 p-0" // Gunakan ! untuk override styles Flowbite
                        position="left"
                    >
                        <Drawer.Items className="p-0">
                            <MobileSidebar />
                        </Drawer.Items>
                    </Drawer>
                </>
            )}
        </>
    );
};

export default Header;

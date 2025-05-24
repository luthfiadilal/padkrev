import { Icon } from '@iconify/react';
import { Button, Drawer, Navbar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import MobileSidebar from '../Sidebar/MobileSidebar';
import Profile from './Profile';
import Notification from './notification';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

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

    // mobile-sidebar
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    return (
        <>
            <header
                className={`sticky top-0 z-[5] ${
                    isSticky ? 'fixed w-full bg-white dark:bg-dark' : 'bg-white'
                }`}
            >
                <Navbar
                    fluid
                    className={`rounded-none bg-transparent px-4 py-4 sm:px-30 dark:bg-transparent`}
                >
                    {/* Mobile Toggle Icon */}

                    <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span
                                onClick={() => setIsOpen(true)}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-black text-opacity-65 hover:bg-lightprimary hover:text-primary xl:hidden dark:text-white"
                            >
                                <Icon
                                    icon="solar:hamburger-menu-line-duotone"
                                    height={21}
                                />
                            </span>
                            <Notification />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                as={Link}
                                to="#"
                                size={'sm'}
                                color={'primary'}
                                className="rounded-md px-3 py-1"
                            >
                                Download Free
                            </Button>
                            <Profile />
                        </div>
                    </div>
                </Navbar>
            </header>

            {/* Mobile Sidebar */}
            <Drawer open={isOpen} onClose={handleClose} className="w-130">
                <Drawer.Items>
                    <MobileSidebar />
                </Drawer.Items>
            </Drawer>
        </>
    );
};

export default Header;

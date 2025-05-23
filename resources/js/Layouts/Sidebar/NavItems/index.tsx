import { Icon } from '@iconify/react';
import { Sidebar } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router';
import { ChildItem } from '../Sidebaritems';

interface NavItemsProps {
    item: ChildItem;
}
const NavItems: React.FC<NavItemsProps> = ({ item }) => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
            <Sidebar.Item
                to={item.url}
                as={Link}
                className={`${
                    item.url == pathname
                        ? 'active rounded-xl bg-primary text-white shadow-btnshdw hover:bg-primary hover:text-white dark:hover:text-white'
                        : 'group/link bg-transparent text-link'
                } `}
            >
                <span className="align-center flex items-center gap-3">
                    {item.icon ? (
                        <Icon
                            icon={item.icon}
                            className={`${item.color}`}
                            height={18}
                        />
                    ) : (
                        <span
                            className={`${
                                item.url == pathname
                                    ? 'mx-1.5 h-[6px] w-[6px] rounded-full !bg-primary group-hover/link:bg-primary dark:bg-white'
                                    : 'mx-1.5 h-[6px] w-[6px] rounded-full bg-black/40 group-hover/link:bg-primary dark:bg-white'
                            } `}
                        ></span>
                    )}
                    <span className={`max-w-36 overflow-hidden`}>
                        {item.name}
                    </span>
                </span>
            </Sidebar.Item>
        </>
    );
};

export default NavItems;

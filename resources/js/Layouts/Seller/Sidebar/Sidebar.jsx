import FullLogo from '@/Layouts/shared/logo/Fulllogo';
import { Sidebar } from 'flowbite-react';
import React from 'react';
import SimpleBar from 'simplebar-react';
import NavItems from './NavItems';
import SidebarContent from './SidebarItems';

const SidebarLayout = () => {
    return (
        <div className="hidden xl:block">
            <Sidebar
                className="menu-sidebar fixed flex flex-col bg-white rtl:pe-4 rtl:ps-0 dark:bg-darkgray"
                aria-label="Sidebar with multi-level dropdown example"
                style={{ height: '100vh' }}
            >
                {/* Logo Section - Fixed at top */}
                <div className="brand-logo flex items-center bg-secondary px-5 py-2">
                    <FullLogo />
                </div>

                {/* Scrollable Content Section */}
                <div className="flex-grow overflow-hidden">
                    <SimpleBar
                        className="h-full"
                        style={{ height: 'calc(100vh - 72px)' }}
                    >
                        <Sidebar.Items className="mt-2 px-5">
                            <Sidebar.ItemGroup className="sidebar-nav hide-menu">
                                {SidebarContent?.map((item, index) => (
                                    <div className="caption" key={item.heading}>
                                        <React.Fragment key={index}>
                                            <h5 className="caption font-semibold pb-2 text-xs uppercase leading-6 tracking-widest text-link dark:text-white/70">
                                                {item.heading}
                                            </h5>
                                            {item.children?.map(
                                                (child, childIndex) => (
                                                    <React.Fragment
                                                        key={
                                                            child.id ||
                                                            childIndex
                                                        }
                                                    >
                                                        <NavItems
                                                            item={child}
                                                        />
                                                    </React.Fragment>
                                                ),
                                            )}
                                        </React.Fragment>
                                    </div>
                                ))}
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </SimpleBar>
                </div>
            </Sidebar>
        </div>
    );
};

export default SidebarLayout;

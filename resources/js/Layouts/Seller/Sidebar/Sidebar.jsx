import { Sidebar } from 'flowbite-react';
import React from 'react';
import SimpleBar from 'simplebar-react';
import NavItems from './NavItems';
import SidebarContent from './SidebarItems';

const SidebarLayout = () => {
    return (
        <>
            <div className="hidden xl:block">
                <Sidebar
                    className="menu-sidebar fixed bg-white rtl:pe-4 rtl:ps-0 dark:bg-darkgray"
                    aria-label="Sidebar with multi-level dropdown example"
                >
                    <div className="sidebarlogo flex items-center px-6 py-4">
                        {/* <FullLogo /> */}
                    </div>
                    <SimpleBar className="h-[calc(100vh_-_230px)]">
                        <Sidebar.Items className="mt-2 px-5">
                            <Sidebar.ItemGroup className="sidebar-nav hide-menu">
                                {SidebarContent &&
                                    SidebarContent?.map((item, index) => (
                                        <div
                                            className="caption"
                                            key={item.heading}
                                        >
                                            <React.Fragment key={index}>
                                                <h5 className="caption font-semibold pb-2 text-xs uppercase leading-6 tracking-widest text-link dark:text-white/70">
                                                    {item.heading}
                                                </h5>
                                                {item.children?.map(
                                                    (child, index) => (
                                                        <React.Fragment
                                                            key={
                                                                child.id &&
                                                                index
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
                </Sidebar>
            </div>
        </>
    );
};

export default SidebarLayout;

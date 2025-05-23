import { Sidebar } from 'flowbite-react';
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import FullLogo from '../shared/logo/FullLogo';
import NavItems from './NavItems';
import SidebarContent from './Sidebaritems';
import Upgrade from './Upgrade';

const MobileSidebar = () => {
    return (
        <>
            <div>
                <Sidebar
                    className="menu-sidebar fixed bg-white pt-0 transition-all dark:bg-darkgray"
                    aria-label="Sidebar with multi-level dropdown example"
                >
                    <div className="sidebarlogo flex items-center px-5 py-4 pb-7">
                        <FullLogo />
                    </div>
                    <SimpleBar className="h-[calc(100vh_-_242px)]">
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
                    <Upgrade />
                </Sidebar>
            </div>
        </>
    );
};

export default MobileSidebar;

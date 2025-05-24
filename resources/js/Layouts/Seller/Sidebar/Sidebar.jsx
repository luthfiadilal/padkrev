import { Sidebar } from 'flowbite-react';
import SimpleBar from 'simplebar-react';
import FullLogo from '../../shared/logo/FullLogo';
import NavItems from './NavItems';
import SidebarContent from './SidebarItems';

const SidebarLayout = () => {
    return (
        <div className="hidden xl:block">
            <Sidebar
                className="menu-sidebar fixed w-64 bg-white dark:bg-darkgray"
                aria-label="Sidebar"
            >
                <div className="flex h-[72px] flex-shrink-0 items-center justify-center border-b border-gray-200 px-4 py-4 dark:border-gray-700">
                    <FullLogo />
                </div>
                <SimpleBar className="h-[calc(100vh-72px)]">
                    <Sidebar.Items className="px-2 py-1">
                        <Sidebar.ItemGroup className="space-y-0.5">
                            {SidebarContent?.map((item, index) => (
                                <div
                                    key={`group-${index}`}
                                    className="mt-1 first:mt-0"
                                >
                                    {item.heading && (
                                        <h5 className="font-medium px-3 py-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            {item.heading}
                                        </h5>
                                    )}
                                    <div className="space-y-0.5">
                                        {item.children?.map(
                                            (child, childIndex) => (
                                                <NavItems
                                                    key={`item-${child.id || childIndex}`}
                                                    item={child}
                                                    compact
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </SimpleBar>
            </Sidebar>
        </div>
    );
};

export default SidebarLayout;

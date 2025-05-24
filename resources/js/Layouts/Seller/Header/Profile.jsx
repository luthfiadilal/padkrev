import { Icon } from '@iconify/react';
import { Button, Dropdown } from 'flowbite-react';
import { Link } from 'react-router';
// import user1 from '/src/assets/images/profile/user-1.jpg';

const Profile = () => {
    return (
        <div className="group/menu relative">
            <Dropdown
                label=""
                className="w-44 rounded-sm"
                dismissOnClick={false}
                renderTrigger={() => (
                    <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-lightprimary hover:text-primary group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
                        <img
                            src=""
                            alt="logo"
                            height="35"
                            width="35"
                            className="rounded-full"
                        />
                    </span>
                )}
            >
                <Dropdown.Item
                    as={Link}
                    to="#"
                    className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark"
                >
                    <Icon icon="solar:user-circle-outline" height={20} />
                    My Profile
                </Dropdown.Item>
                <Dropdown.Item
                    as={Link}
                    to="#"
                    className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark"
                >
                    <Icon icon="solar:letter-linear" height={20} />
                    My Account
                </Dropdown.Item>
                <Dropdown.Item
                    as={Link}
                    to="#"
                    className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark"
                >
                    <Icon icon="solar:checklist-linear" height={20} />
                    My Task
                </Dropdown.Item>
                <div className="p-3 pt-0">
                    <Button
                        as={Link}
                        size={'sm'}
                        to="/auth/login"
                        className="mt-2 border border-primary bg-transparent text-primary outline-none hover:bg-lightprimary focus:outline-none"
                    >
                        Logout
                    </Button>
                </div>
            </Dropdown>
        </div>
    );
};

export default Profile;

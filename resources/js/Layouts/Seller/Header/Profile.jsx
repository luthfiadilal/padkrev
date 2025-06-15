import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { Button, Dropdown } from 'flowbite-react';
// import user1 from '/src/assets/images/profile/user-1.jpg';

const Profile = ({ user }) => {
    const handletoProfile = () => {
        router.get(route('profile.index'));
    };
    const handletoEdit = () => {
        router.get(route('profile.edit'));
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };
    return (
        <div className="group/menu relative">
            <Dropdown
                label=""
                className="w-44 rounded-sm"
                dismissOnClick={false}
                renderTrigger={() => (
                    <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-lightprimary hover:text-primary group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
                        <img
                            src={
                                user?.penjual?.foto_profil
                                    ? `/storage/${user.penjual.foto_profil}`
                                    : '/images/default-profile.png'
                            }
                            alt="logo"
                            height="35"
                            width="35"
                            className="rounded-full"
                        />
                    </span>
                )}
            >
                <Dropdown.Item
                    onClick={handletoProfile}
                    className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark"
                >
                    <Icon icon="solar:user-circle-outline" height={20} />
                    My Profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={handletoEdit}
                    className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark"
                >
                    <Icon icon="solar:letter-linear" height={20} />
                    My Account
                </Dropdown.Item>
                <div className="p-3 pt-0">
                    <Button
                        size={'sm'}
                        onClick={handleLogout}
                        className="mt-2 w-full border border-primary bg-transparent p-2 text-primary outline-none hover:bg-lightprimary focus:outline-none"
                    >
                        Logout
                    </Button>
                </div>
            </Dropdown>
        </div>
    );
};

export default Profile;

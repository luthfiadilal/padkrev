import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { Button, Dropdown } from 'flowbite-react';

const Profile = ({ user }) => {
    const handleToProfile = () => {
        router.get(route('profile.index'));
    };

    const handleToEdit = () => {
        router.get(route('profile.edit'));
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    // Tentukan foto profil berdasarkan role
    const getFotoProfil = () => {
        if (!user || !user.role) return null;

        if (user.role === 'seller') {
            return user.penjual?.foto_profil;
        } else if (user.role === 'buyer') {
            return user.pembeli?.foto_profil;
        } else if (user.role === 'admin') {
            return user.admin?.foto_profil;
        }
        return null;
    };

    const fotoProfil = getFotoProfil();

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
                                fotoProfil
                                    ? `/storage/${fotoProfil}`
                                    : '/images/default-profile.png'
                            }
                            alt="User Profile"
                            height="35"
                            width="35"
                            className="rounded-full object-cover"
                        />
                    </span>
                )}
            >
                <Dropdown.Item
                    onClick={handleToProfile}
                    className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark"
                >
                    <Icon icon="solar:user-circle-outline" height={20} />
                    My Profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={handleToEdit}
                    className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark"
                >
                    <Icon icon="solar:letter-linear" height={20} />
                    My Account
                </Dropdown.Item>

                <div className="p-3 pt-0">
                    <Button
                        size="sm"
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

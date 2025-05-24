import { Icon } from '@iconify/react';
import { Badge, Dropdown } from 'flowbite-react';
import { Link } from 'react-router';
// import user1 from '/src/assets/images/profile/user-1.jpg';
// import user2 from '/src/assets/images/profile/user-2.jpg';
// import user3 from '/src/assets/images/profile/user-3.jpg';
// import user4 from '/src/assets/images/profile/user-4.jpg';

const Notifications = [
    {
        id: 1,
        title: 'Received Order from John Doe of $385.90',
        user: '',
    },
    {
        id: 2,
        title: 'Received Order from Jessica Williams of $249.99',
        user: '',
    },
    {
        id: 3,
        title: 'Received Order from John Edison of $499.99',
        user: '',
    },
    {
        id: 4,
        title: 'Received message from Nitin Chohan',
        user: '',
    },
];

const Notification = () => {
    return (
        <div className="group/menu relative">
            <Dropdown
                label=""
                className="notification w-[300px] rounded-sm"
                dismissOnClick={false}
                renderTrigger={() => (
                    <span
                        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-lightprimary hover:text-primary group-hover/menu:bg-lightprimary group-hover/menu:text-primary"
                        aria-label="Notifications"
                    >
                        <Icon icon="solar:bell-linear" height={20} />
                        <Badge className="absolute end-2 left-10 top-1 h-2 w-2 rounded-full bg-primary p-0" />
                    </span>
                )}
            >
                {Notifications.map((item) => (
                    <Dropdown.Item
                        as={Link}
                        key={item.id}
                        to="#"
                        className="bg-hover group/link flex w-full items-center gap-3 px-3 py-3 text-dark hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-5">
                            <div>
                                <img
                                    src={item.user}
                                    alt="user"
                                    width={40}
                                    height={40}
                                    className="shrink-0 rounded-full"
                                />
                            </div>
                            <p className="font-semibold text-[13px] text-dark opacity-80">
                                {item.title}
                            </p>
                        </div>
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    );
};

export default Notification;

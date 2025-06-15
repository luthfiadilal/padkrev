import { uniqueId } from 'lodash';

const SidebarContent = [
    {
        heading: 'HOME',
        children: [
            {
                name: 'Dashboard',
                icon: 'solar:widget-add-line-duotone',
                id: uniqueId(),
                url: '/dashboard-admin',
                route: 'admin.dashboard',
            },
            {
                name: 'User',
                icon: 'solar:shop-linear',
                id: uniqueId(),
                url: '/users',
                route: 'admin.users.index',
            },
        ],
    },
    {
        heading: 'Produk',
        children: [
            {
                name: 'Produk',
                icon: 'solar:box-linear',
                id: uniqueId(),
                url: '/produkpenjual',
                route: 'admin.toko.produk',
            },

            {
                name: 'Transaksi',
                icon: 'solar:bag-5-linear',
                id: uniqueId(),
                url: '/all-transaksi',
                route: 'admin.transaksi.index',
            },
        ],
    },
];

export default SidebarContent;

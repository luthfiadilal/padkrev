import { uniqueId } from 'lodash';

const SidebarContent = [
    {
        heading: 'HOME',
        children: [
            {
                name: 'Dashboard',
                icon: 'solar:widget-add-line-duotone',
                id: uniqueId(),
                url: '/',
            },
            {
                name: 'Toko',
                icon: 'solar:shop-linear',
                id: uniqueId(),
                url: '/toko',
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
                url: '/ui/produk',
            },
            {
                name: 'Kategori',
                icon: 'solar:bedside-table-3-linear',
                id: uniqueId(),
                url: '/ui/kategori',
            },
            {
                name: 'Transaksi',
                icon: 'solar:bag-5-linear',
                id: uniqueId(),
                url: '/ui/transaksi',
            },
        ],
    },
    {
        heading: 'AUTH',
        children: [
            {
                name: 'Login',
                icon: 'solar:login-2-linear',
                id: uniqueId(),
                url: '/auth/login',
            },
            {
                name: 'Register',
                icon: 'solar:shield-user-outline',
                id: uniqueId(),
                url: '/auth/register',
            },
        ],
    },
];

export default SidebarContent;

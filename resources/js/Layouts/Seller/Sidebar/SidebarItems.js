import { uniqueId } from 'lodash';

const SidebarContent = [
    {
        heading: 'HOME',
        children: [
            {
                name: 'Dashboard',
                icon: 'solar:widget-add-line-duotone',
                id: uniqueId(),
                url: '/dashboard-seller',
                route: 'seller.dashboard',
            },
            {
                name: 'Toko',
                icon: 'solar:shop-linear',
                id: uniqueId(),
                url: '/toko',
                route: 'seller.toko',
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
                url: '/produk',
                route: 'produk-index',
            },
            {
                name: 'Kategori',
                icon: 'solar:bedside-table-3-linear',
                id: uniqueId(),
                url: '/kategori',
                route: 'kategori-create',
            },
            {
                name: 'Transaksi',
                icon: 'solar:bag-5-linear',
                id: uniqueId(),
                url: '/transaksi',
                route: 'historypenjual.index',
            },
        ],
    },
];

export default SidebarContent;

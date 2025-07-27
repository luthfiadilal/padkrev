import ScrollToTop from '@/Components/shared/ScrollToTop';
import EditUserModal from '@/Layouts/Admin/EditUserModal';
import { Icon } from '@iconify/react';
import { router, usePage } from '@inertiajs/react';
import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Header from '../../Layouts/Admin/Header/Header';
import SidebarLayout from '../../Layouts/Admin/Sidebar/Sidebar';

export default function UserPage() {
    const { user, users, filters, editUser } = usePage().props;

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [sort, setSort] = useState(filters.sort || 'asc');
    const [showEditModal, setShowEditModal] = useState(false);

    // ✅ Auto buka modal ketika editUser berubah
    useEffect(() => {
        if (editUser) {
            setShowEditModal(true);
        }
    }, [editUser]);

    const handleFilter = () => {
        router.get(
            route('admin.users.index'),
            { search, role, sort },
            { preserveState: true, replace: true },
        );
    };

    const handleEdit = (id) => {
        router.get(
            route('admin.users.index'),
            {
                search,
                role,
                sort,
                editId: id,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus user ini?')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    const handleModalClose = () => {
        setShowEditModal(false);
        router.get(
            route('admin.users.index'),
            {
                search,
                role,
                sort,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="flex min-h-screen w-full dark:bg-darkgray">
            <SidebarLayout />
            <div className="page-wrapper flex w-full">
                <div className="page-wrapper-sub flex w-full flex-col dark:bg-darkgray">
                    <Header user={user} />
                    <div className="h-full rounded-bb bg-lightgray dark:bg-dark">
                        <div className="w-full">
                            <ScrollToTop>
                                <div className="container px-4 py-10">
                                    <h1 className="font-bold mb-4 text-2xl text-dark dark:text-white">
                                        Daftar User
                                    </h1>

                                    {/* Filter Section */}
                                    <div className="mb-6 flex flex-wrap gap-3">
                                        <input
                                            type="text"
                                            placeholder="Cari nama..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="w-full rounded border px-3 py-2 sm:w-auto"
                                        />
                                        <select
                                            value={role}
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                            className="w-full rounded border px-3 py-2 sm:w-auto"
                                        >
                                            <option value="">Semua Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="seller">
                                                Penjual
                                            </option>
                                            <option value="buyer">
                                                Pembeli
                                            </option>
                                        </select>
                                        <select
                                            value={sort}
                                            onChange={(e) =>
                                                setSort(e.target.value)
                                            }
                                            className="w-full rounded border px-3 py-2 sm:w-auto"
                                        >
                                            <option value="asc">
                                                Nama A - Z
                                            </option>
                                            <option value="desc">
                                                Nama Z - A
                                            </option>
                                        </select>
                                        <Button
                                            className="items-center gap-2 bg-primary text-white"
                                            onClick={handleFilter}
                                        >
                                            Terapkan Filter
                                        </Button>
                                    </div>
                                    {/* Tombol Register Seller */}
                                    <button
                                        className="hover:bg-secondary/90 mb-6 flex items-center gap-3 rounded-lg bg-secondary px-4 py-4 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                                        onClick={() =>
                                            router.visit(
                                                route('register.seller'),
                                            )
                                        }
                                    >
                                        <Icon
                                            icon="solar:add-circle-bold"
                                            width="20"
                                        />
                                        <span>Register Penjual</span>
                                    </button>

                                    {/* Table Section */}
                                    <div className="overflow-x-auto rounded-lg shadow">
                                        <Table hoverable>
                                            <Table.Head>
                                                <Table.HeadCell>
                                                    Nama
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Email
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Role
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Aksi
                                                </Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body className="divide-y">
                                                {users.data.length === 0 ? (
                                                    <Table.Row>
                                                        <Table.Cell
                                                            colSpan="4"
                                                            className="text-center text-gray-500 dark:text-gray-400"
                                                        >
                                                            Tidak ada data
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ) : (
                                                    users.data.map((u) => (
                                                        <Table.Row
                                                            key={u.id}
                                                            className="bg-white dark:bg-gray-800"
                                                        >
                                                            <Table.Cell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                                                {u.name}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {u.email}
                                                            </Table.Cell>
                                                            <Table.Cell className="capitalize">
                                                                {u.role}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        size="xs"
                                                                        className="bg-primary px-2 py-1"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                u.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        size="xs"
                                                                        className="bg-red-400 px-2 py-1"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                u.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    ))
                                                )}
                                            </Table.Body>
                                        </Table>
                                    </div>

                                    {/* Modal */}
                                    {editUser && (
                                        <EditUserModal
                                            user={editUser}
                                            show={showEditModal}
                                            onClose={handleModalClose}
                                        />
                                    )}
                                </div>
                            </ScrollToTop>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Button } from 'flowbite-react';
import Modal from './Modal'; // Sesuaikan path ke modal Anda

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Konfirmasi Penghapusan',
    message = 'Apakah Anda yakin ingin menghapus item ini?',
    confirmText = 'Hapus',
    cancelText = 'Batal',
    isLoading = false,
}) => {
    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h3 className="font-medium mb-4 text-lg text-gray-900">
                    {title}
                </h3>
                <p className="mb-6 text-gray-600">{message}</p>

                <div className="flex justify-end space-x-3">
                    <Button
                        color="light"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Menghapus...' : confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;

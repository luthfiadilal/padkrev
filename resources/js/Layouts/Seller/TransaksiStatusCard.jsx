import StatCard from './StatCard';

export default function TransaksiStatusCard({ statusData }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
                icon="solar:clock-bold"
                label="Belum Dibayar"
                value={statusData.belum_dibayar}
                bg="bg-yellow-100 dark:bg-yellow-900"
            />
            <StatCard
                icon="solar:check-circle-bold"
                label="Sudah Dibayar"
                value={statusData.sudah_dibayar}
                bg="bg-green-100 dark:bg-green-900"
            />
            <StatCard
                icon="solar:close-circle-bold"
                label="Dibatalkan"
                value={statusData.dibatalkan}
                bg="bg-red-100 dark:bg-red-900"
            />
        </div>
    );
}

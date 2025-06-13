import { Icon } from '@iconify/react';

export default function StatCard({
    icon,
    label,
    value,
    bg = 'bg-white',
    variant = 'normal',
}) {
    if (variant === 'highlight') {
        return (
            <div
                className={`flex flex-col items-center justify-between rounded-xl p-6 shadow-md md:flex-row ${bg}`}
            >
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-4 text-4xl text-primary">
                        <Icon icon={icon} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-medium text-sm text-gray-500">
                            {label}
                        </div>
                        <div className="font-bold text-3xl text-gray-800 dark:text-white">
                            {value}
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-400 dark:text-gray-300 md:mt-0">
                    Semua produk aktif yang kamu jual
                </div>
            </div>
        );
    }

    return (
        <div
            className={`rounded-xl shadow-sm ${bg} flex items-center justify-between gap-4 p-6`}
        >
            <div className="flex flex-col gap-2">
                <div className="font-medium text-sm text-gray-500">{label}</div>
                <div className="font-bold text-lg text-gray-800 dark:text-white">
                    {value}
                </div>
            </div>
            <div className="text-3xl text-primary">
                <Icon icon={icon} />
            </div>
        </div>
    );
}

import { useState } from 'react';
import PaymentCardGroupSeller from './PaymentCardGroupSeller';
export default function PaymentTabsSeller({
    belumBayar,
    sudahBayar,
    dibatalkan,
}) {
    const [activeTab, setActiveTab] = useState('belumBayar');

    const tabStyle =
        'px-4 py-2 text-sm font-semibold rounded-t-md transition-all duration-200';
    const activeStyle = 'bg-primary text-white shadow-md';
    const inactiveStyle =
        'bg-gray-100 text-textgray hover:bg-primary hover:text-white';

    return (
        <div className="w-full">
            {/* Tab Header */}
            <div className="flex gap-2 border-b border-gray-200 pb-2">
                <button
                    className={`${tabStyle} ${
                        activeTab === 'belumBayar' ? activeStyle : inactiveStyle
                    }`}
                    onClick={() => setActiveTab('belumBayar')}
                >
                    Belum Bayar
                </button>
                <button
                    className={`${tabStyle} ${
                        activeTab === 'sudahBayar' ? activeStyle : inactiveStyle
                    }`}
                    onClick={() => setActiveTab('sudahBayar')}
                >
                    Sudah Bayar
                </button>
                <button
                    className={`${tabStyle} ${
                        activeTab === 'dibatalkan' ? activeStyle : inactiveStyle
                    }`}
                    onClick={() => setActiveTab('dibatalkan')}
                >
                    Dibatalkan
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {activeTab === 'belumBayar' &&
                    (belumBayar.length === 0 ? (
                        <p className="text-sm italic text-textgray">
                            Tidak ada transaksi.
                        </p>
                    ) : (
                        belumBayar.map((trx) => (
                            <PaymentCardGroupSeller
                                key={trx.id}
                                transaksi={trx}
                                status="belumBayar"
                            />
                        ))
                    ))}

                {activeTab === 'sudahBayar' &&
                    (sudahBayar.length === 0 ? (
                        <p className="text-sm italic text-textgray">
                            Tidak ada transaksi.
                        </p>
                    ) : (
                        sudahBayar.map((trx) => (
                            <PaymentCardGroupSeller
                                key={trx.id}
                                transaksi={trx}
                                status="sudahBayar"
                            />
                        ))
                    ))}
                {activeTab === 'dibatalkan' &&
                    (dibatalkan.length === 0 ? (
                        <p className="text-sm italic text-textgray">
                            Tidak ada transaksi.
                        </p>
                    ) : (
                        dibatalkan.map((trx) => (
                            <PaymentCardGroupSeller
                                key={trx.id}
                                transaksi={trx}
                                status="dibatalkan"
                            />
                        ))
                    ))}
            </div>
        </div>
    );
}

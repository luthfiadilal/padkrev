import { useState } from 'react';
import PaymentCardGroup from './PaymentCardGroup';

export default function PaymentTabs({ belumBayar, sudahBayar }) {
    const [activeTab, setActiveTab] = useState('belumBayar');

    return (
        <div>
            {/* Tab header */}
            <div className="mb-4 flex border-b">
                <button
                    className={`font-medium px-4 py-2 ${
                        activeTab === 'belumBayar'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-blue-500'
                    }`}
                    onClick={() => setActiveTab('belumBayar')}
                >
                    Belum Bayar
                </button>
                <button
                    className={`font-medium ml-4 px-4 py-2 ${
                        activeTab === 'sudahBayar'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-blue-500'
                    }`}
                    onClick={() => setActiveTab('sudahBayar')}
                >
                    Sudah Bayar
                </button>
            </div>

            {/* Tab content */}
            <div>
                {activeTab === 'belumBayar' && (
                    <>
                        {belumBayar.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                Tidak ada transaksi.
                            </p>
                        ) : (
                            belumBayar.map((trx) => (
                                <PaymentCardGroup
                                    key={trx.id}
                                    transaksi={trx}
                                />
                            ))
                        )}
                    </>
                )}

                {activeTab === 'sudahBayar' && (
                    <>
                        {sudahBayar.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                Tidak ada transaksi.
                            </p>
                        ) : (
                            sudahBayar.map((trx) => (
                                <PaymentCardGroup
                                    key={trx.id}
                                    transaksi={trx}
                                />
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

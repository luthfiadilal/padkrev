<?php

namespace App\Exports;

use App\Models\Transaksi;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Collection;

class TransaksiExport implements FromCollection, WithMapping, WithHeadings, ShouldQueue
{
    protected $bulan;
    protected $tahun;
    protected $status;

    public function __construct($bulan, $tahun, $status)
    {
        $this->bulan = $bulan;
        $this->tahun = $tahun;
        $this->status = $status;
    }

    public function collection()
    {
        $query = Transaksi::with(['pembeli.user', 'items.produk'])
        ->whereMonth('created_at', $this->bulan)
        ->whereYear('created_at', $this->tahun);

        if ($this->status) {
            $query->where('status', $this->status);
        }

        return $query->get();
    }

    public function map($transaksi): array
    {
        return $transaksi->items->map(function ($item) use ($transaksi) {
            return [
                $transaksi->kode_transaksi,
                $transaksi->created_at->format('Y-m-d'),
                $transaksi->pembeli->user->name ?? '-',
                $item->produk->nama ?? '-',
                $item->quantity,
                $item->harga_satuan,
                $item->harga_total,
                $transaksi->status,
            ];
        })->toArray();
    }

    public function headings(): array
    {
        return [
            'Kode Transaksi',
            'Tanggal',
            'Nama Pembeli',
            'Nama Produk',
            'Jumlah',
            'Harga Satuan',
            'Harga Total',
            'Status',
        ];
    }
}

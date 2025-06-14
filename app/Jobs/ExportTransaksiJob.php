<?php

namespace App\Jobs;

use App\Exports\TransaksiExport;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;


class ExportTransaksiJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $bulan;
    protected $tahun;
    protected $status;
    protected $fileName;

    /**
     * Create a new job instance.
     */
    public function __construct($bulan, $tahun, $status, $fileName)
    {
        $this->bulan = $bulan;
        $this->tahun = $tahun;
        $this->status = $status;
        $this->fileName = $fileName;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // $fileName = "transaksi_{$this->bulan}_{$this->tahun}_" . time() . ".xlsx";
        // $filePath = "exports/{$fileName}";

         $filePath = "exports/{$this->fileName}";

        // Tambahkan log biar kelihatan
        \Log::info('Menyimpan export transaksi', [
            'file' => $this->fileName,
            'path' => storage_path("app/public/exports/{$this->fileName}")
        ]);
        // Simpan ke public storage
        Excel::store(
            new TransaksiExport($this->bulan, $this->tahun, $this->status),
            $filePath,
            'public' // simpan ke storage/app/public
        );
    }
}

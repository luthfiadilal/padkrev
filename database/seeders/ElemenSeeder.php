<?php

namespace Database\Seeders;

use App\Models\Elemen;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ElemenSeeder extends Seeder
{
    public function run()
    {
        // Buat folder public/img jika belum ada
        if (!File::exists(public_path('img'))) {
            File::makeDirectory(public_path('img'), 0755, true);
        }

        // Daftar file yang akan diproses
        $files = [
            'ai.svg' => [
                'name' => 'AI',
            ],
            'Arrow 1.svg' => [
                'name' => 'Arrow 1',
            ],
            'cloth.svg' => [
                'name' => 'Cloth',
            ],
            'elemen.svg' => [
                'name' => 'Elemen',
            ],
            'food.svg' => [
                'name' => 'Food',
            ],
            'house.svg' => [
                'name' => 'House',
            ],
            'map.svg' => [
                'name' => 'Map',
            ],
            'padkrevlogo.png' => [
                'name' => 'Logo',
            ],
            'shopping-bag.svg' => [
                'name' => 'Shopping Bag',
            ],
            'vector2.png' => [
                'name' => 'Vector 2',
            ],
            'vector3d.png' => [
                'name' => 'Vector 3D',
            ],
            'wo.svg' => [
                'name' => 'WO',
            ],
            'favicon.svg' => [
                'name' => 'Favicon'
            ],
            'banner.svg' => [
                'name' => 'Banner'
            ]



            // Tambahkan file lain sesuai kebutuhan
        ];

        foreach ($files as $fileName => $data) {
            $sourcePath = base_path("assets/{$fileName}");
            $destPath = public_path("img/{$fileName}");

            // Salin file jika belum ada di public/img
            if (File::exists($sourcePath) && !File::exists($destPath)) {
                File::copy($sourcePath, $destPath);
            }

            // Simpan ke database
            Elemen::updateOrCreate(
                ['name' => $data['name']],
                [
                    'path_image' => $fileName,

                ]
            );
        }
    }
}

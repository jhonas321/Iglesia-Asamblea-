<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    public function run()
    {
        Rol::updateOrCreate(
            ['nombre' => 'Administrador'],
            [
                'descripcion' => 'Administrador general del sistema',
            ]
        );
    }
}
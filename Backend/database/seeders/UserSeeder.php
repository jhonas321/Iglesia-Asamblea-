<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Rol;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $rol = Rol::where('nombre', 'Administrador')->first();

        User::updateOrCreate(
            [
                'email' => 'admin@iglesia.com',
            ],
            [
                'rol_id' => $rol->id,
                'name' => 'Administrador',
                'password' => Hash::make('admin123'),
                'icono' => 'hombre-1',
                'activo' => true,
            ]
        );
    }
}
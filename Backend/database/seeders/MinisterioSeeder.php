<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ministerio;

class MinisterioSeeder extends Seeder
{
    public function run()
    {
        $ministerios = [
            [
                'nombre' => 'Jóvenes',
                'descripcion' => 'Ministerio dedicado al crecimiento espiritual y participación de los jóvenes.',
            ],
            [
                'nombre' => 'Damas',
                'descripcion' => 'Ministerio dedicado a la formación y participación de las damas.',
            ],
            [
                'nombre' => 'Alabanza',
                'descripcion' => 'Ministerio encargado de la música, adoración y alabanza.',
            ],
            [
                'nombre' => 'Niños',
                'descripcion' => 'Ministerio dedicado a la enseñanza y formación espiritual de los niños.',
            ],
        ];

        foreach ($ministerios as $ministerio) {
            Ministerio::updateOrCreate(
                [
                    'nombre' => $ministerio['nombre'],
                ],
                [
                    'descripcion' => $ministerio['descripcion'],
                    'activo' => true,
                ]
            );
        }
    }
}
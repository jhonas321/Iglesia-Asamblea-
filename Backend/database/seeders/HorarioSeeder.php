<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Horario;

class HorarioSeeder extends Seeder
{
    public function run()
    {
        $horarios = [
            [
                'dia' => 'Lunes',
                'actividad' => 'Oración',
                'hora' => '19:00:00',
                'icono_tipo' => 'oracion',
                'descripcion' => 'Tiempo especial de oración.',
            ],
            [
                'dia' => 'Viernes',
                'actividad' => 'Culto de Enseñanza',
                'hora' => '19:30:00',
                'icono_tipo' => 'ensenanza',
                'descripcion' => 'Estudio y enseñanza de la palabra de Dios.',
            ],
            [
                'dia' => 'Sábado',
                'actividad' => 'Reunión de Jóvenes',
                'hora' => '19:30:00',
                'icono_tipo' => 'jovenes',
                'descripcion' => 'Reunión especial dirigida a los jóvenes.',
            ],
            [
                'dia' => 'Domingo',
                'actividad' => 'Culto General',
                'hora' => '19:00:00',
                'icono_tipo' => 'principal',
                'descripcion' => 'Culto general de la congregación.',
            ],
        ];

        foreach ($horarios as $horario) {
            Horario::updateOrCreate(
                [
                    'dia' => $horario['dia'],
                    'actividad' => $horario['actividad'],
                ],
                [
                    'hora' => $horario['hora'],
                    'icono_tipo' => $horario['icono_tipo'],
                    'descripcion' => $horario['descripcion'],
                    'activo' => true,
                ]
            );
        }
    }
}
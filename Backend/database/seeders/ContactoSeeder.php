<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contacto;

class ContactoSeeder extends Seeder
{
    public function run()
    {
        Contacto::updateOrCreate(
            ['id' => 1],
            [
                'nombre_iglesia' => 'Asamblea Apostólica de la Fe en Cristo Jesús',
                'direccion' => 'Cochabamba, Bolivia',
                'telefono' => null,
                'whatsapp_numero' => null,

                'footer_ubicacion' => 'Cochabamba, Bolivia',
                'footer_telefono' => null,
                'footer_correo' => null,

                'facebook_url' => null,
                'youtube_url' => null,
                'instagram_url' => null,
                'tiktok_url' => null,
                'twitter_url' => null,
                'telegram_url' => null,
            ]
        );
    }
}
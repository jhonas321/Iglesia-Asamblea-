<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            RolSeeder::class,
            UserSeeder::class,
            ContactoSeeder::class,
            MinisterioSeeder::class,
            HorarioSeeder::class,
        ]);
    }
}
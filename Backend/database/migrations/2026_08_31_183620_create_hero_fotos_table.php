<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHeroFotosTable extends Migration
{
    public function up()
    {
        Schema::create('hero_fotos', function (Blueprint $table) {
            $table->id();

            $table->string('titulo', 150);

            $table->string('imagen', 1000);

            $table->integer('orden')
                ->default(1);

            $table->boolean('activo')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hero_fotos');
    }
}
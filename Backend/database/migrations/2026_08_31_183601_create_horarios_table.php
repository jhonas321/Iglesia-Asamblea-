<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorariosTable extends Migration
{
    public function up()
    {
        Schema::create('horarios', function (Blueprint $table) {
            $table->id();

            $table->string('dia', 20);

            $table->string('actividad', 150);

            $table->time('hora');

            $table->string('icono_tipo', 50)
                ->default('principal');

            $table->text('descripcion');

            $table->boolean('activo')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('horarios');
    }
}
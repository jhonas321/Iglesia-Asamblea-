<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMiembrosOrganigramaTable extends Migration
{
    public function up()
    {
        Schema::create('miembros_organigrama', function (Blueprint $table) {
            $table->id();

            $table->foreignId('seccion_organigrama_id')
                ->constrained('secciones_organigrama')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('nombre', 150);

            $table->string('cargo', 150);

            $table->string('genero', 20)
                ->default('hombre');

            $table->integer('orden')
                ->default(1);

            $table->boolean('activo')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('miembros_organigrama');
    }
}
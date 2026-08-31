<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeccionesOrganigramaTable extends Migration
{
    public function up()
    {
        Schema::create('secciones_organigrama', function (Blueprint $table) {
            $table->id();

            $table->foreignId('ministerio_id')
                ->nullable()
                ->constrained('ministerios')
                ->onUpdate('cascade')
                ->onDelete('set null');

            $table->string('titulo', 150);

            $table->text('descripcion');

            $table->string('tipo', 20)
                ->default('normal');

            $table->boolean('activo')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('secciones_organigrama');
    }
}
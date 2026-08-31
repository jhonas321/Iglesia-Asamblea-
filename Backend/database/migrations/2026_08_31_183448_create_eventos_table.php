<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventosTable extends Migration
{
    public function up()
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('ministerio_id')
                ->constrained('ministerios')
                ->onUpdate('cascade')
                ->onDelete('restrict');

            $table->string('titulo', 200);

            $table->date('fecha_inicio');

            $table->date('fecha_final');

            $table->time('hora');

            $table->string('lugar', 200);

            $table->string('whatsapp_numero', 30)
                ->nullable();

            $table->text('descripcion');

            $table->text('detalles')
                ->nullable();

            $table->string('imagen', 1000)
                ->nullable();

            $table->boolean('activo')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('eventos');
    }
}
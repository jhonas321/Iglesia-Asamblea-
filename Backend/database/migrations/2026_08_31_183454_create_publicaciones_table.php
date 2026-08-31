<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublicacionesTable extends Migration
{
    public function up()
    {
        Schema::create('publicaciones', function (Blueprint $table) {
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

            $table->text('descripcion');

            $table->string('imagen', 1000)
                ->nullable();

            $table->string('video_trailer_url', 1000)
                ->nullable();

            $table->string('video_trailer_portada', 1000)
                ->nullable();

            $table->string('video_completo_url', 1500)
                ->nullable();

            $table->boolean('activo')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('publicaciones');
    }
}
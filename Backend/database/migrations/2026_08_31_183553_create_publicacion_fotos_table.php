<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublicacionFotosTable extends Migration
{
    public function up()
    {
        Schema::create('publicacion_fotos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('publicacion_id')
                ->constrained('publicaciones')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('imagen', 1000);

            $table->integer('orden')
                ->default(1);

            $table->timestamps();

            $table->unique([
                'publicacion_id',
                'orden'
            ]);
        });
    }

    public function down()
    {
        Schema::dropIfExists('publicacion_fotos');
    }
}